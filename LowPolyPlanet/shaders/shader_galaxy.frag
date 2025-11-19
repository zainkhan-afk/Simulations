#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

#define PI 3.14159265

// Simple 2D hash function for random stars
float hash21(vec2 p){
    p = fract(p*vec2(123.34, 456.21));
    p += dot(p,p+45.32);
    return fract(p.x*p.y);
}

// Classic 2D FBM
float noise(vec2 p){
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash21(i);
    float b = hash21(i + vec2(1.0,0.0));
    float c = hash21(i + vec2(0.0,1.0));
    float d = hash21(i + vec2(1.0,1.0));
    vec2 u = f*f*(3.0-2.0*f);
    return mix(a,b,u.x) + (c-a)*u.y*(1.0-u.x) + (d-b)*u.x*u.y;
}

float fbm(vec2 p){
    float f = 0.0;
    float amp = 0.5;
    for(int i=0; i<5; i++){
        f += amp*noise(p);
        p *= 2.0;
        amp *= 0.5;
    }
    return f;
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    uv = uv*2.0 - 1.0; // center at 0
    uv.x *= u_resolution.x / u_resolution.y;

    float r = length(uv);
    float theta = atan(uv.y, uv.x);

    // Spiral arms
    float armTwist = 5.0;       // number of arms
    float armNoise = fbm(vec2(theta*armTwist, r*3.0));
    float spiral = smoothstep(0.2, 0.6, armNoise) * (1.0 - r);

    // Core glow
    float core = exp(-r*r*8.0);

    // Stars layer
    float stars = hash21(gl_FragCoord.xy*0.5);
    stars = step(0.995, stars); // threshold few stars
    float twinkle = sin(u_time + gl_FragCoord.x*0.1)*0.5 + 0.5;
    stars *= twinkle;

    // Dust/fainter stars
    float dust = fbm(uv*5.0 + u_time*0.05)*0.2;

    // Color mix
    vec3 color = vec3(0.0);
    color += vec3(0.1,0.2,0.5)*spiral;  // spiral arms
    color += vec3(1.0,0.9,0.7)*core;    // galactic core
    color += vec3(1.0)*stars;           // bright stars
    color += vec3(0.2,0.3,0.5)*dust;    // dust

    gl_FragColor = vec4(color, 1.0);
}
