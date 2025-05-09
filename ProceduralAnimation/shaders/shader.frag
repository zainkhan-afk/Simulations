#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution; // This is passed in as a uniform from the sketch.js file
uniform float u_time; // This is passed in as a uniform from the sketch.js file
uniform vec2 fishSegmentsPositions[800];
uniform float segmentRadii[8];
uniform int numFishes;

//float pi = 3.1411592;
const float pi = 3.1;
const int numSegments = 8;


vec3 drawFishes(vec2 uv)
{
    for (int i = 0; i < 100; i++)
    {
        if (i >= numFishes) break;
        for (int j = 0; j < numSegments; j++)
        {
            vec2 segmentPosition = fishSegmentsPositions[i * numSegments + j];

            // float diff = pow(segmentPosition.x - uv.x, 2.0);

            if (sqrt(pow(segmentPosition.x - uv.x, 2.0) + pow(segmentPosition.y - uv.y, 2.0)) < segmentRadii[j])
            {
                return vec3(1.0, 0.7, 0.0);
            }
        }
    }
    return vec3(0.0, 0.7, 1.0);
}


void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xx;
    vec3 color = drawFishes(uv);

    gl_FragColor = vec4(color, 1.0);
}