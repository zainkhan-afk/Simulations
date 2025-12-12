#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.142
varying vec3 vNormal;
varying vec3 vPos;   // local position

uniform vec2 u_resolution; // Screen resolution
uniform float u_time;      // Time for animation
uniform vec3 u_sphere_pos;
uniform vec3 u_light_pos;


const vec3 sphereColor = vec3(1.0, 0.0, 0.5);
// const vec3 lighDirection = vec3(-5.0, -5.0, 15.0);
const vec3 lightColor = vec3(0.2, 0.2, 0.8);



// ===========================================================
// 3D Classic Perlin Noise
// Source: Adapted from IQ (Inigo Quilez)
// ===========================================================
vec4 permute(vec4 x) {
    return mod(((x * 34.0) + 1.0) * x, 289.0);
}

vec4 taylorInvSqrt(vec4 r) {
    return 1.79284291400159 - 0.85373472095314 * r;
}

float noise3D(vec3 P) {
    vec3 Pi0 = floor(P);        // Integer part
    vec3 Pi1 = Pi0 + 1.0;       // Integer + 1
    vec3 Pf0 = fract(P);        // Fractional part
    vec3 Pf1 = Pf0 - 1.0;       // Fractional - 1

    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
    vec4 iy = vec4(Pi0.y, Pi0.y, Pi1.y, Pi1.y);
    vec4 iz0 = vec4(Pi0.z);
    vec4 iz1 = vec4(Pi1.z);

    vec4 ixy = permute(permute(ix) + iy);
    vec4 ixy0 = permute(ixy + iz0);
    vec4 ixy1 = permute(ixy + iz1);

    vec4 gx0 = ixy0 / 289.0;
    vec4 gy0 = fract(floor(gx0 / 7.0) / 7.0) - 0.5;
    gx0 = fract(gx0) - 0.5;

    vec4 gz0 = vec4(0.75) - abs(gx0) - abs(gy0);
    vec4 sz0 = step(gz0, vec4(0.0));
    gx0 -= sz0 * (step(0.0, gx0) - 0.5);
    gy0 -= sz0 * (step(0.0, gy0) - 0.5);

    vec4 gx1 = ixy1 / 289.0;
    vec4 gy1 = fract(floor(gx1 / 7.0) / 7.0) - 0.5;
    gx1 = fract(gx1) - 0.5;

    vec4 gz1 = vec4(0.75) - abs(gx1) - abs(gy1);
    vec4 sz1 = step(gz1, vec4(0.0));
    gx1 -= sz1 * (step(0.0, gx1) - 0.5);
    gy1 -= sz1 * (step(0.0, gy1) - 0.5);

    // Gradients
    vec3 g000 = vec3(gx0.x, gy0.x, gz0.x);
    vec3 g100 = vec3(gx0.y, gy0.y, gz0.y);
    vec3 g010 = vec3(gx0.z, gy0.z, gz0.z);
    vec3 g110 = vec3(gx0.w, gy0.w, gz0.w);

    vec3 g001 = vec3(gx1.x, gy1.x, gz1.x);
    vec3 g101 = vec3(gx1.y, gy1.y, gz1.y);
    vec3 g011 = vec3(gx1.z, gy1.z, gz1.z);
    vec3 g111 = vec3(gx1.w, gy1.w, gz1.w);

    // Noise interpolation
    vec3 fade_xyz = Pf0 * Pf0 * Pf0 * (Pf0 * (Pf0 * 6.0 - 15.0) + 10.0);

    float n000 = dot(g000, Pf0);
    float n100 = dot(g100, vec3(Pf1.x, Pf0.y, Pf0.z));
    float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
    float n110 = dot(g110, vec3(Pf1.x, Pf1.y, Pf0.z));

    float n001 = dot(g001, vec3(Pf0.x, Pf0.y, Pf1.z));
    float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
    float n011 = dot(g011, vec3(Pf0.x, Pf1.y, Pf1.z));
    float n111 = dot(g111, vec3(Pf1.x, Pf1.y, Pf1.z));

    float nxyz =
        mix(mix(mix(n000, n100, fade_xyz.x),
                mix(n010, n110, fade_xyz.x),
            fade_xyz.y),
            mix(mix(n001, n101, fade_xyz.x),
                mix(n011, n111, fade_xyz.x),
            fade_xyz.y),
        fade_xyz.z);
    return nxyz;
}

// ===========================================================
// FBM using 3D noise
// ===========================================================
float fbm3D(vec3 p) {
    float value = 0.0;
    float amplitude = 10.0;
    float freq = 1.0;

    for (int i = 0; i < 8; i++) {
        value += amplitude * noise3D(p * freq);
        freq *= 2.0;
        amplitude *= 0.1;
    }
    return value;
}

// ===========================================================
// Biome maps (temperature + moisture)
// ===========================================================
vec3 biomeColor(vec3 p) {
    // float temp = noise3D(p * 0.6)*5.5 + 0.5;
    // float moist = noise3D(p * 0.5) * 0.5 + 0.31;
    vec3 biome;

    // if (temp < 0.3) biome = vec3(0.8, 0.8, 1.0);         // tundra
    // else if (moist < 0.3) biome = vec3(0.8, 0.7, 0.2);  // desert
    // else if (temp > 0.7) biome = vec3(0.1, 0.7, 0.1);   // jungle
    // else biome = vec3(0.2, 0.5, 0.2);                   // forest
    float pointLen = length(p);
    if (pointLen < 1.0){
        biome = vec3(0.0, 0.2, 0.6);
    }
    else if(pointLen < 1.05){
        biome = vec3(0.4, 0.1, 0.1);
    }
    else if(pointLen <= 1.1){
        biome = vec3(0.2, 0.5, 0.2);
    }
    else if(pointLen > 1.1){
        biome = vec3(0.8, 0.8, 1.0);
    }
    // else if(pointLen >= 1.5){
    //     biome = vec3(0.1, 0.7, 0.1);
    // }

    return biome;
}


void main() {
    // Normalized pixel coordinates (from -1 to 1)
    vec2 uv = gl_FragCoord.xy;// / u_resolution;

    vec3 N = normalize(vNormal);       // surface normal
    vec3 L = normalize(u_light_pos);     // light direction

    float diff = max(dot(N, L), 0.0);
    vec3 p = vPos;

    float size = 0.05;
    // p.x = floor(p.x / size) * size;
    // p.y = floor(p.y / size) * size;
    // p.z = floor(p.z / size) * size;

    // float n = fbm3D(p * 2.0);
    vec3 biome = biomeColor(p);

    vec3 land = vec3(0.2, 0.7, 0.3);
    vec3 sea  = vec3(0.0, 0.2, 0.6);

    float ndotl = max(dot(N, L), 0.0);


    // vec3 color = mix(sea, biome, smoothstep(0.2, 0.3, n));
    vec3 color = biome;
    // vec3 diffuse = color * ndotl;
    
    // size = 0.05;
    // color = floor(color / size) * size;
    
    vec3 diffuse = color * diff; //lightColor * 
    gl_FragColor = vec4(diffuse, 1.0);
}