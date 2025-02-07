#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution; // Screen resolution
uniform float u_time;      // Time for animation
uniform vec3 u_sphere_pos;
// Camera and ray marching settings
const int MAX_STEPS = 100;         // Maximum steps for ray marching
const float MAX_DIST = 1000.0;      // Maximum distance to march
const float MIN_DIST = 0.001;      // Minimum distance to consider a hit

// Sphere properties
const vec3 SPHERE_POS = vec3(0.0, -100.0, 0.0); // Sphere position
const float SPHERE_RADIUS = 30.0;              // Sphere radius

// Lighting
const vec3 LIGHT_DIR = normalize(vec3(10.0, 10.0, 10.0)); // Light direction
const vec3 LIGHT_COLOR = vec3(0.5, 0.5, 0.5);           // Light color
const vec3 AMBIENT_COLOR = vec3(140.0/255.0, 59.0/255.0, 12.0/255.0);         // Ambient light
const vec3 SKY_COLOR = vec3(0.0, 0.4, 0.9);         // Ambient light

// 

float dist3D(vec3 p1, vec3 p2) {
    return length(p1 - p2);
    // return (p1.x - p2.x)*(p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y) + (p1.z - p2.z) * (p1.z - p2.z);
}

// Signed Distance Function (SDF) for a sphere
float sdSphere(vec3 p, vec3 center, float radius) {
    return length(p - center) - radius;
}

// Ray marching function
float rayMarch(vec3 ro, vec3 rd, float maxDist, float minDist) {
    float dist = 0.0;
    for (int i = 0; i < MAX_STEPS; i++) {
        vec3 pos = ro + rd * dist;
        float d = sdSphere(pos, SPHERE_POS, SPHERE_RADIUS); // Distance to sphere
        if (d < minDist) {
            return dist; // Hit the sphere
        }
        dist += d;
        if (dist >= maxDist) {
            break; // Ray went too far, no hit
        }
    }
    return -1.0; // No hit
}

// Calculate normal at a point on the surface
vec3 getNormal(vec3 p) {
    float d = sdSphere(p, SPHERE_POS, SPHERE_RADIUS);
    vec2 e = vec2(0.001, 0.0);
    vec3 n = d - vec3(
        sdSphere(p - e.xyy, SPHERE_POS, SPHERE_RADIUS),
        sdSphere(p - e.yxy, SPHERE_POS, SPHERE_RADIUS),
        sdSphere(p - e.yyx, SPHERE_POS, SPHERE_RADIUS)
    );
    return normalize(n);
}

// Shading function
vec3 shade(vec3 ro, vec3 rd, float hitDist) {
    if (hitDist < 0.0) {
        return SKY_COLOR; // Background color (black)
    }

    // Calculate hit point
    vec3 hitPoint = ro + rd * hitDist;

    // Calculate normal at hit point
    vec3 normal = getNormal(hitPoint);

    // Diffuse lighting
    float diffuse = max(dot(normal, LIGHT_DIR), 0.0);
    vec3 diffuseColor = diffuse * LIGHT_COLOR;

    // Ambient lighting
    vec3 ambientColor = AMBIENT_COLOR;

    // Combine lighting
    return ambientColor + diffuseColor;
}


vec2 hash( vec2 p ) {
	p = vec2(dot(p,vec2(127.1,311.7)), dot(p,vec2(269.5,183.3)));
	return -1.0 + 2.0*fract(sin(p)*43758.5453123);
}

float noise( in vec2 p ) {
    const float K1 = 0.366025404; // (sqrt(3)-1)/2;
    const float K2 = 0.211324865; // (3-sqrt(3))/6;
	vec2 i = floor(p + (p.x+p.y)*K1);	
    vec2 a = p - i + (i.x+i.y)*K2;
    vec2 o = (a.x>a.y) ? vec2(1.0,0.0) : vec2(0.0,1.0); //vec2 of = 0.5 + 0.5*vec2(sign(a.x-a.y), sign(a.y-a.x));
    vec2 b = a - o + K2;
	vec2 c = a - 1.0 + 2.0*K2;
    vec3 h = max(0.5-vec3(dot(a,a), dot(b,b), dot(c,c) ), 0.0 );
	vec3 n = h*h*h*h*vec3( dot(a,hash(i+0.0)), dot(b,hash(i+o)), dot(c,hash(i+1.0)));
    return dot(n, vec3(70.0));	
}

float FBM(vec2 p)
{
    const int numOctaves = 4;

    float val = 0.0;

    vec2 pos = p;

    float frequency = 0.5;
    float amplitude = 0.1;
    float freq_inc = 1.0;
    float amplitude_mult = 0.3;
    
    for (int i = 0; i < numOctaves; i++)
    {
        pos *= frequency;
        val += amplitude*noise(pos) + pos.y / 50.0 + pos.x / 100.0;

        frequency += freq_inc;
        amplitude *= amplitude_mult;
    }

    return val;
}

float rayMarchTerrain(vec2 p, vec3 ro, vec3 rd, float maxDist, float minDist)
{   
    float dist = 0.0;
    for (int i = 0; i < MAX_STEPS; i++) {
        vec3 pos = ro + rd * dist;
        
        float z = FBM(pos.xy);
        
        float d = pos.z - z;
        // d = 0.0;
        // dist = 0.24;
        // float d = sdSphere(pos, SPHERE_POS, SPHERE_RADIUS); // Distance to sphere
        if (d < minDist) {
            return dist; // Hit the sphere
        }
        dist += d;
        if (dist >= maxDist) {
            break; // Ray went too far, no hit
        }
    }
    return -1.0; // No hit
}


// Calculate normal at a point on the surface
vec3 getTerrainNormal(vec3 p) {
    vec2 e = vec2(0.001, 0.0);
    float zHit = FBM(p.xy);
    float zdx = FBM(p.xy - e.xy);
    float zdy = FBM(p.xy - e.yx);
    float zdz = zHit - e.x;
    vec3 n = zHit - vec3(zdx, zdy, zdz);
    return normalize(n);
}

// Shading function
vec3 shadeTerrain(vec3 ro, vec3 rd, float hitDist) {
    if (hitDist < 0.0) {
        return SKY_COLOR; // Background color (black)
    }

    // Calculate hit point
    vec3 hitPoint = ro + rd * hitDist;

    // Calculate normal at hit point
    vec3 normal = getTerrainNormal(hitPoint);

    // Diffuse lighting
    float diffuse = max(dot(normal, LIGHT_DIR), 0.0);
    vec3 diffuseColor = diffuse * LIGHT_COLOR;

    // Ambient lighting
    vec3 ambientColor = AMBIENT_COLOR;

    // Combine lighting
    return ambientColor + diffuseColor;
}

void main() {
    // Normalized pixel coordinates (from -1 to 1)
    vec2 uv = (2.0 * gl_FragCoord.xy - u_resolution.xy) / u_resolution.y;
    
    // Camera setup
    vec3 ro = vec3(0.0, 0.0, 1.0); // Ray origin (camera position)
    // vec3 rd = normalize(vec3(uv.x, -1, uv.y)); // Ray direction
    vec3 rd = normalize(vec3(uv.x, 1.0, uv.y)); // Ray direction

    // // Ray marching
    // float hitDist = rayMarch(ro, rd, MAX_DIST, MIN_DIST);

    // // Shading
    // vec3 color = shade(ro, rd, hitDist);
    
    // // Output to screen
    // gl_FragColor = vec4(color, 1.0);

    float hitDist = rayMarchTerrain(uv, ro, rd, MAX_DIST, MIN_DIST);
    vec3 color = shadeTerrain(ro, rd, hitDist);
    
    // gl_FragColor = vec4(0, 0, hitDist, 1.0);
    gl_FragColor = vec4(color, 1.0);
}