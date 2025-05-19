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
const int numFishPoints = (numSegments - 1)*2 + 1;
// const int numFishPoints = 5;

vec2 fishBodyPolygon[numFishPoints];



float getGradient(vec2 p1, vec2 p2)
{
    return (p1.y - p2.y) / (p1.x - p2.x);
}

float getIntercept(vec2 p, float gradient)
{
    return p.y - gradient * p.x;
}

bool pointInPolygon(vec2 pt) {
    bool inside = false;
    for (int i = 0; i < numFishPoints - 1; i++) {
        vec2 vi = fishBodyPolygon[i];
        vec2 vj = fishBodyPolygon[i + 1];

        bool intersect = ((vi.y > pt.y) != (vj.y > pt.y)) &&
                         (pt.x < (vj.x - vi.x) * (pt.y - vi.y) / (vj.y - vi.y + 0.00001) + vi.x);

        if (intersect)
            inside = !inside;
    }
    return inside;
}

// vec3 drawFishes(vec2 uv)
// {
//     // const int values[5] = int[5](2.0,  4.0, 0.0, 4.0, 2.0);
//     for (int i = 0; i < 100; i++)
//     {
//         if (i >= numFishes) break;
//         for (int j = 0; j < numSegments; j++)
//         {
//             vec2 segmentPosition = fishSegmentsPositions[i * numSegments + j];

//             if (j == 0){
//                 if (sqrt(pow(segmentPosition.x - uv.x, 2.0) + pow(segmentPosition.y - uv.y, 2.0)) < segmentRadii[j])
//                 {
//                     return vec3(1.0, 0.7, 0.0);
//                 }
//             }
//             else{
//                 vec2 diff = segmentPosition - fishSegmentsPositions[i * numSegments + (j - 1)];
//                 float parentAngle = atan(diff.y , diff.x);
//                 float angle = parentAngle - pi / 2.0;
//                 vec2 side1p1 = fishSegmentsPositions[i * numSegments + (j - 1)] + vec2(segmentRadii[j] * cos(angle), segmentRadii[j - 1] * sin(angle));
//                 vec2 side1p2 = segmentPosition + vec2(segmentRadii[j] * cos(angle), segmentRadii[j] * sin(angle));
//                 angle = parentAngle + pi / 2.0;
//                 vec2 side2p1 = fishSegmentsPositions[i * numSegments + (j - 1)] + vec2(segmentRadii[j] * cos(angle), segmentRadii[j - 1] * sin(angle));
//                 vec2 side2p2 = segmentPosition + vec2(segmentRadii[j] * cos(angle), segmentRadii[j] * sin(angle));

//                 float side1m = getGradient(side1p1, side1p2);
//                 float side1c = getIntercept(side1p1, side1m);
//                 float side2m = getGradient(side2p1, side2p2);
//                 float side2c = getIntercept(side2p1, side2m);


//                 if (uv.x > side1p1.x && uv.x < side1p2.x || uv.x < side1p1.x && uv.x > side1p2.x)
//                 {
//                     float proposedYSide1 = uv.x * side1m + side1c;
//                     float proposedYSide2 = uv.x * side2m + side2c;
//                     if (proposedYSide1 > uv.y && proposedYSide2 < uv.y || proposedYSide1 < uv.y && proposedYSide2 > uv.y)
//                     {
//                         return vec3(1.0, 0.7, 0.0);
//                     }
//                 }
//             }
//         }
//     }
//     return vec3(0.0, 0.7, 1.0);
// }


vec3 drawFishes(vec2 uv)
{
    // const int values[5] = int[5](2.0,  4.0, 0.0, 4.0, 2.0);
    for (int i = 0; i < 100; i++)
    {
        if (i >= numFishes) break;
        for (int j = 1; j < numSegments; j++)
        {
            vec2 segmentPosition = fishSegmentsPositions[i * numSegments + j];

            vec2 diff = segmentPosition - fishSegmentsPositions[i * numSegments + (j - 1)];
            float parentAngle = atan(diff.y , diff.x);
            float angle = parentAngle - pi / 2.0;
            vec2 p1 = fishSegmentsPositions[i * numSegments + (j - 1)] + vec2(segmentRadii[j] * cos(angle), segmentRadii[j - 1] * sin(angle));
            vec2 p2 = segmentPosition + vec2(segmentRadii[j] * cos(angle), segmentRadii[j] * sin(angle));

            fishBodyPolygon[j - 1] = p2;

            if (j == 1)
            {
                fishBodyPolygon[numFishPoints - 1] = p2;
            }
        }

        for (int j = numSegments - 1; j > 0; j--)
        {
            vec2 segmentPosition = fishSegmentsPositions[i * numSegments + j];

            vec2 diff = segmentPosition - fishSegmentsPositions[i * numSegments + (j - 1)];
            float parentAngle = atan(diff.y , diff.x);
            float angle = parentAngle + pi / 2.0;
            vec2 p1 = fishSegmentsPositions[i * numSegments + (j + 1)] + vec2(segmentRadii[j] * cos(angle), segmentRadii[j + 1] * sin(angle));
            vec2 p2 = segmentPosition + vec2(segmentRadii[j] * cos(angle), segmentRadii[j] * sin(angle));
            fishBodyPolygon[(numSegments - 1) + (numSegments - 1 - j)] = p2;
        }

        if (pointInPolygon(uv))
        {
            return vec3(0.0, 0.7, 0.0);
        }
    }
    return vec3(0.0, 0.7, 1.0);
}


void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xx;
    vec3 color = drawFishes(uv);


    gl_FragColor = vec4(color, 1.0);
}