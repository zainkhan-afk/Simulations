#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution; // This is passed in as a uniform from the sketch.js file
uniform float u_time; // This is passed in as a uniform from the sketch.js file

float water_speed = 0.1;
float cloud_speed = 0.1;
//float pi = 3.1411592;
const float pi = 3.1;
vec3 cloudsColor = vec3(1.0, 1.0, 0.9);


float dist(vec2 p1, vec2 p2) {
    //return 0.0;
    return (p1.x - p2.x)*(p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y);
}

float roundToOneDecimalPlace(float value) {
    return floor(value * 10.0 + 0.5) / 10.0;
}


float quantize(float value, float levels) {
    return floor(value * levels) / levels;
}

float rescale(float value, float low, float high) {
    if (value < low) { return 0.0;}
    if (value > high) { return 1.0;}
    value = (value - low) / (high - low);
    return value;
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

float FBM(vec2 p, float frequency, float amplitude, float freq_inc, float amplitude_mult)
{
    const int numOctaves = 5;

    float val = 0.0;

    vec2 pos = p; 
    
    for (int i = 0; i < numOctaves; i++)
    {
        pos *= frequency;
        val += amplitude*noise(pos);

        frequency += freq_inc;
        amplitude *= amplitude_mult;
    }

    return val;
}

float DrawClouds(vec2 uv)
{

    float frequency = 0.5;
    float freq_inc = 1.0;
    float amplitude = 9.0;
    float amplitude_mult = 0.01;

    uv.y += u_time*cloud_speed;
    float n = FBM(uv, frequency, amplitude, freq_inc, amplitude_mult);
    return n;
}


float HeightMap(vec2 uv)
{
    float frequency = 0.4;
    float freq_inc = 1.0;
    float amplitude = 10.0;
    float amplitude_mult = 0.3;
    float z = FBM(uv, frequency, amplitude, freq_inc, amplitude_mult);
    return z;
}

float box(vec2 uv, float x, float y, float w, float h)
{
    if (x < uv.x && x + w > uv.x)
    {
        if (y < uv.y && y + h> uv.y)
        {
            return 1.0;
        }
    }
    return 0.0;
}

float ridge(vec2 uv, vec2 center, float x1, float x2, float h)
{
    vec2 localP = uv - center;
    float m1 = -h / x1;
    float m2 = -h / x2;

    if (localP.x > x1 && localP.x < x2 && localP.y < h)
    {
        if (localP.x <= 0.0)
        {
            if (localP.y < (localP.x * m1 + h) && localP.y >= 0.0)
            {
                return 1.0;
            }
        }
        if (localP.x > 0.0)
        {
            if (localP.y < (localP.x * m2 + h) && localP.y >= 0.0)
            {
                return 1.0;
            }
        }
    }
    return 0.0;
}

float parabola(vec2 uv, vec2 center, float a, float x1, float x2)
{
    vec2 localP = uv - center;

    if (localP.x > x1 && localP.x < x2)
    {
        float yHat = a*localP.x*localP.x - a * x1 * x1;
        if (localP.x <= 0.0 && localP.y >= 0.0)
        {
            if (localP.y < yHat)
            {
                return 1.0;
            }
        }
        if (localP.x > 0.0)
        {
            if (localP.y < yHat && localP.y >= 0.0)
            {
                return 1.0;
            }
        }
    }
    return 0.0;
}

float plane(vec2 uv, float x, float y)
{
    float cockpitWidth = 0.005;
    float cockpitLength = 0.08;

    float wingspan = 0.05;
    float wingLength = 0.01;
    float wingStarty = y + cockpitLength * 0.75;

    float tailspan = 0.02;
    float tailLength = 0.009;
    float tailStarty = y + cockpitLength * 0.15;

    float cockpitMask = box(uv, x - cockpitWidth / 2.0, y, cockpitWidth, cockpitLength);
    
    float wingspanMask = ridge(uv, vec2(x, wingStarty), -wingspan / 2.0, wingspan / 2.0, wingLength);
    wingspanMask += box(uv, x - wingspan / 2.0, wingStarty - wingLength, wingspan, wingLength);
    
    float tailspanMask = ridge(uv, vec2(x, tailStarty), -tailspan / 2.0, tailspan / 2.0, tailLength);
    tailspanMask += box(uv, x - tailspan / 2.0, tailStarty -  tailLength*0.7, tailspan, tailLength*0.7);

    float noseMask = parabola(uv, vec2(x, y + cockpitLength), -700.0, - cockpitWidth / 2.0, cockpitWidth / 2.0);




    float planeMask = clamp(cockpitMask + wingspanMask + tailspanMask + noseMask, 0.0, 1.0);
    return planeMask;
}

float plane3D(vec2 uv, float plane_x, float plane_y)
{
    float x = uv.x - plane_x;
    float y = uv.y - plane_y;

    float plane_length = 0.03;
    //float plane_width = 0.005 - abs(y - plane_length/5.0)*0.07;
    float plane_width = 0.005;
    float plane_height = plane_width;

    float z = 0.0;

    if (abs(x) <= plane_width && abs(y) <= plane_length)
    {
        z = sqrt(plane_height*plane_height - x*x);
        z = z / plane_height;
        return z;
    }

    return z;
}

vec3 DrawWater(vec2 uv)
{
    uv.y += u_time * water_speed;
    //float z = HeightMap(uv);
    //float z = 1.0;
    //vec3 texture_color = vec3(0.192156862745098, 0.5627450980392157- (uv.x + (1.0 - uv.y)) / 4.0, z - 0.9333333333333333 - (uv.x + (1.0 - uv.y)) / 4.0);

    vec3 shallowColor = vec3(0.4, 0.8, 0.9);
    //vec3 deepColor = vec3(0.0, 0.1, 0.3);
    vec3 deepColor = vec3(0.2, 0.4, 0.6);


    //float depthFactor = clamp((z - 0.0) / (10.0 - 0.0), 0.0, 1.0);
    //depthFactor = 0.0;

    //depthFactor = rescale(depthFactor, 0.3, 0.5);

    //depthFactor = quantize(depthFactor, 5.0);

    // Interpolate between shallow and deep colors
    //vec3 texture_color = mix(shallowColor, deepColor, depthFactor);

    vec3 texture_color = vec3(0.2, 0.5, 0.9);
    
    vec3 k = vec3(u_time)*0.6;
	k.xy = uv * 200.0;
    
    float val1 = length(0.5-fract(k.xyz*=mat3(vec3(-2.0,-1.0,0.0), vec3(3.0,-1.0,1.0), vec3(1.0,-1.0,-1.0))*0.5));
    float val2 = length(0.5-fract(k.xyz*=mat3(vec3(-2.0,-1.0,0.0), vec3(3.0,-1.0,1.0), vec3(1.0,-1.0,-1.0))*0.2));
    float val3 = length(0.5-fract(k.xyz*=mat3(vec3(-2.0,-1.0,0.0), vec3(3.0,-1.0,1.0), vec3(1.0,-1.0,-1.0))*0.5));
    vec3 color = vec3 ( pow(min(min(val1,val2),val3), 7.0) * 1.0)+texture_color;

    return color;
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xx;
    vec3 waterColor = DrawWater(uv);
    //float cloudVal = DrawClouds(uv);
    float cloudVal = 0.0;

    float planeMask = plane3D(uv, 0.5, 0.2);
    //float planeMask = 0.0;
    
    vec3 result = mix(waterColor, cloudsColor, cloudVal * 0.1);
    
    if (planeMask > 0.0)
    {
        result = mix(vec3(0.3, 0.3, 0.7), vec3(0.8, 0.8, 0.8), planeMask);
    }
    
    gl_FragColor = vec4(result, 1.0);
    
    float z = HeightMap(uv);
    //gl_FragColor = vec4(0.0, 0.0, z/2.0, 1.0);
}