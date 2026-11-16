
// Get the position attribute of the geometry
attribute vec3 aPosition;

// Get the texture coordinate attribute from the geometry
attribute vec2 aTexCoord;

// Get the vertex normal attribute from the geometry
attribute vec3 aNormal;

// When we use 3d geometry, we need to also use some builtin variables that p5 provides
// Most 3d engines will provide these variables for you. They are 4x4 matrices that define
// the camera position / rotation, and the geometry position / rotation / scale
// There are actually 3 matrices, but two of them have already been combined into a single one
// This pre combination is an optimization trick so that the vertex shader doesn't have to do as much work

// uProjectionMatrix is used to convert the 3d world coordinates into screen coordinates 
uniform mat4 uProjectionMatrix;

// uModelViewMatrix is a combination of the model matrix and the view matrix
// The model matrix defines the object position / rotation / scale
// Multiplying uModelMatrix * vec4(aPosition, 1.0) would move the object into it's world position

// The view matrix defines attributes about the camera, such as focal length and camera position
// Multiplying uModelViewMatrix * vec4(aPosition, 1.0) would move the object into its world position in front of the camera
uniform mat4 uModelViewMatrix;

// Get the framecount uniform
uniform float uFrameCount;
uniform float uRidgeAmp;
uniform float uRidgeF;
uniform float uRidgeOffset;
uniform float uTerrainAmp;
uniform float uTerrainF;
uniform float uTerrainOffset;
uniform float uRidgeMaskOffset;
uniform float uRidgeMaskFreq;
uniform float uRidgeMaskThesh;

varying vec2 vTexCoord;
varying vec3 vNormal;
varying vec3 vPos;   // local position


const float EPS = 0.001;



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

float hash(vec3 p)  // replace this by something better
{
    p  = 50.0*fract( p*0.3183099 + vec3(0.71,0.113,0.419));
    return -1.0+2.0*fract( p.x*p.y*p.z*(p.x+p.y+p.z) );
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

    // float nxyz =
        // mix(mix(mix(n000, n100, fade_xyz.x),
        //         mix(n010, n110, fade_xyz.x),
        //     fade_xyz.y),
        //     mix(mix(n001, n101, fade_xyz.x),
        //         mix(n011, n111, fade_xyz.x),
        //     fade_xyz.y),
        // fade_xyz.z);
        vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
        vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
        float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
    return n_xyz;
}

//	Classic Perlin 3D Noise 
//	by Stefan Gustavson (https://github.com/stegu/webgl-noise)
//
// vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
// vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
vec3 fade(vec3 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}

float cnoise(vec3 P){
  vec3 Pi0 = floor(P); // Integer part for indexing
  vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
  Pi0 = mod(Pi0, 289.0);
  Pi1 = mod(Pi1, 289.0);
  vec3 Pf0 = fract(P); // Fractional part for interpolation
  vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  vec4 iy = vec4(Pi0.yy, Pi1.yy);
  vec4 iz0 = Pi0.zzzz;
  vec4 iz1 = Pi1.zzzz;

  vec4 ixy = permute(permute(ix) + iy);
  vec4 ixy0 = permute(ixy + iz0);
  vec4 ixy1 = permute(ixy + iz1);

  vec4 gx0 = ixy0 / 7.0;
  vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
  gx0 = fract(gx0);
  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
  vec4 sz0 = step(gz0, vec4(0.0));
  gx0 -= sz0 * (step(0.0, gx0) - 0.5);
  gy0 -= sz0 * (step(0.0, gy0) - 0.5);

  vec4 gx1 = ixy1 / 7.0;
  vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
  gx1 = fract(gx1);
  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
  vec4 sz1 = step(gz1, vec4(0.0));
  gx1 -= sz1 * (step(0.0, gx1) - 0.5);
  gy1 -= sz1 * (step(0.0, gy1) - 0.5);

  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

  vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
  g000 *= norm0.x;
  g010 *= norm0.y;
  g100 *= norm0.z;
  g110 *= norm0.w;
  vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
  g001 *= norm1.x;
  g011 *= norm1.y;
  g101 *= norm1.z;
  g111 *= norm1.w;

  float n000 = dot(g000, Pf0);
  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
  float n111 = dot(g111, Pf1);

  vec3 fade_xyz = fade(Pf0);
  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
  return 2.2 * n_xyz;
}

// -------------------------
// RIDGED FBM (replace FBM)
// -------------------------
float ridgedNoise(vec3 p) {
    float sum = 0.0;
    float amplitude = 1.0;
    float frequency = 1.0;
    float prev = 1.0;

    for (int i = 0; i < 5; i++) {
        float n = noise3D(p * frequency);

        n = 0.25 - abs(n);   // ridge shape
        n *= n;            // sharpen
        n *= prev;         // reduce plateaus

        prev = n;

        sum += n * amplitude;

        frequency *= 2.0;
        amplitude *= 0.5;
    }
    return sum;
}

// -------------------------
// Surface FBM (replace FBM)
// -------------------------
float surfaceNoise(vec3 p) {
    float sum = 0.0;
    float amplitude = 1.0;
    float frequency = 1.0;
    float prev = 1.0;

    for (int i = 0; i < 5; i++) {
        float n = noise3D(p * frequency);

        // n = 1.0 - abs(n);   // ridge shape
        // n *= n;            // sharpen
        // n = sqrt(n);
        // n *= prev;         // reduce plateaus

        // prev = n;

        sum += n * amplitude;

        frequency *= 2.0;
        amplitude *= 0.5;
    }
    return sum;
}

void main() {

  vec4 positionVec4 = vec4(aPosition, 1.0);

  // float amplitude = 0.3;

  // Sample height at the current position
  float r = ridgedNoise(positionVec4.xyz * uRidgeF + uRidgeOffset);
  float n = surfaceNoise(positionVec4.xyz * uTerrainF + uTerrainOffset);
  
  float noiseMask = surfaceNoise(positionVec4.xyz * uRidgeMaskFreq + uRidgeMaskOffset);
  float h = n * uTerrainAmp + r * uRidgeAmp ;

  // Apply displacement along normal
  positionVec4.xyz += aNormal * h;

  // ---------------------------------------------------
  //   COMPUTE NEW NORMAL USING FINITE DIFFERENCE
  // ---------------------------------------------------

  // // Offset positions along tangent directions
  // vec3 dxPos = positionVec4.xyz + vec3(EPS, 0.0, 0.0);
  // vec3 dyPos = positionVec4.xyz + vec3(0.0, EPS, 0.0);

  // // Heights at offset positions
  // float hX = ridgedNoise(dxPos * 2.0) * uRidgeAmp;
  // float hY = ridgedNoise(dyPos * 2.0) * uRidgeAmp;

  // // Displaced positions
  // dxPos += aNormal * hX;
  // dyPos += aNormal * hY;

  // // Tangent vectors after displacement
  // vec3 tangentX = dxPos - positionVec4.xyz;
  // vec3 tangentY = dyPos - positionVec4.xyz;

  // // New geometric normal
  // vec3 newNormal = normalize(cross(tangentX, tangentY));

  // // Transform to view-space
  // vNormal = mat3(uModelViewMatrix) * newNormal;
  vNormal = mat3(uModelViewMatrix) * aNormal;

  // ---------------------------------------------------

  gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;

  vPos = positionVec4.xyz;
  vTexCoord = aTexCoord;
}