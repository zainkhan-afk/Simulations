#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution; // This is passed in as a uniform from the sketch.js file
uniform float u_time; // This is passed in as a uniform from the sketch.js file
uniform vec2 fishSegmentsPositions[800];
uniform float fishHeadings[100];
uniform float segmentRadii[8];
uniform float headPointAngles[8];
uniform int numFishes;

const float pi = 3.141592;
// const float pi = 3.1;
const int numSegments = 8;
const int numHeadPoints = 7;
const int numFishPoints = (numSegments - 1)*2 + 2*numHeadPoints + 1;
const int numFishTailPoints = 4;
// const int numFishPoints = 5;

vec2 fishBodyPolygon[numFishPoints];
vec2 fishTailPolygon[numFishTailPoints];



float getGradient(vec2 p1, vec2 p2)
{
    return (p1.y - p2.y) / (p1.x - p2.x);
}

float getIntercept(vec2 p, float gradient)
{
    return p.y - gradient * p.x;
}

bool pointInBodyPolygon(vec2 pt) {
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


bool pointInTailPolygon(vec2 pt) {
    bool inside = false;
    for (int i = 0; i < numFishTailPoints - 1; i++) {
        vec2 vi = fishTailPolygon[i];
        vec2 vj = fishTailPolygon[i + 1];

        bool intersect = ((vi.y > pt.y) != (vj.y > pt.y)) &&
                         (pt.x < (vj.x - vi.x) * (pt.y - vi.y) / (vj.y - vi.y + 0.00001) + vi.x);

        if (intersect)
            inside = !inside;
    }
    return inside;
}

vec3 drawFishesCircles(vec2 uv)
{
    // const int values[5] = int[5](2.0,  4.0, 0.0, 4.0, 2.0);
    for (int i = 0; i < 100; i++)
    {
        if (i >= numFishes) break;
        for (int j = 0; j < numSegments; j++)
        {
            vec2 segmentPosition = fishSegmentsPositions[i * numSegments + j];

            if (sqrt(pow(segmentPosition.x - uv.x, 2.0) + pow(segmentPosition.y - uv.y, 2.0)) < segmentRadii[j])
            {
                return vec3(0.6, 0.0, 0.0);
            }
        }
    }
    return vec3(1.0, 1.0, 1.0);
}

vec3 drawEllipse(vec2 uv, vec2 position, float a, float b, float rotation)
{
    mat2 rotMat = mat2(cos(rotation), -sin(rotation), sin(rotation), cos(rotation));
    vec2 rotatedPosition = rotMat * uv;
    position = rotMat * position;
    float term1 = pow(position.x - rotatedPosition.x, 2.0) / pow(a, 2.0);
    float term2 = pow(position.y - rotatedPosition.y, 2.0) / pow(b, 2.0);

    if (term1 + term2 <= 1.0)
    {
        return vec3(1.0, 0.8, 0.1);
    }
    return vec3(0.0, 0.0, 0.0);
}

bool insideEllipse(vec2 uv, vec2 position, float a, float b, float rotation)
{
    mat2 rotMat = mat2(cos(rotation), -sin(rotation), sin(rotation), cos(rotation));
    vec2 rotatedPosition = rotMat * uv;
    position = rotMat * position;
    float term1 = pow(position.x - rotatedPosition.x, 2.0) / pow(a, 2.0);
    float term2 = pow(position.y - rotatedPosition.y, 2.0) / pow(b, 2.0);

    if (term1 + term2 <= 1.0)
    {
        return true;
    }
    return false;
}

vec3 drawFishes(vec2 uv)
{
    for (int i = 0; i < 100; i++)
    {
        if (i >= numFishes) break;
        vec2 lastTailPoint;
        float lastTailSegmentAngle;
        float angleDiffSum = 0.0;
        float prevAngleDiff = 0.0;
        float prevAngle = 0.0;
        for (int j = 0; j < numSegments; j++)
        {
            vec2 segmentPosition = fishSegmentsPositions[i * numSegments + j];
            if (j == 0)
            {
                for (int k = 0; k < numHeadPoints; k++)
                {
                    float angle = fishHeadings[i] + headPointAngles[k];
                    prevAngle = angle;
                    vec2 p = segmentPosition + vec2(segmentRadii[j] * cos(angle), segmentRadii[j] * sin(angle));
                    fishBodyPolygon[k] = p;
                    if (k == 0)
                    {
                        fishBodyPolygon[numFishPoints - 1] = p;
                    }
                }

            }
            else if ( j == numSegments - 1)
            {
                for (int k = 0; k < numHeadPoints; k++)
                {
                    vec2 diff = segmentPosition - fishSegmentsPositions[i * numSegments + (j - 1)];
                    float parentAngle = atan(diff.y , diff.x);
                    angleDiffSum += (prevAngle - parentAngle);
                    prevAngle = parentAngle;

                    float angle = parentAngle + headPointAngles[k];
                    vec2 p = segmentPosition + vec2(segmentRadii[j] * cos(angle), segmentRadii[j] * sin(angle));
                    fishBodyPolygon[numHeadPoints + numSegments - 2 + k] = p;
                }
                vec2 diff = segmentPosition - fishSegmentsPositions[i * numSegments + (j - 1)];
                lastTailSegmentAngle = atan(diff.y , diff.x);
                float angle = lastTailSegmentAngle + pi;
                lastTailPoint = segmentPosition; //+ vec2(segmentRadii[j] * cos(angle), segmentRadii[j] * sin(angle));
            }
            else{

                vec2 diff = segmentPosition - fishSegmentsPositions[i * numSegments + (j - 1)];
                float parentAngle = atan(diff.y , diff.x);
                angleDiffSum += (prevAngle - parentAngle);
                prevAngle = parentAngle;

                float angle = parentAngle - pi / 2.0;
                vec2 p1 = fishSegmentsPositions[i * numSegments + (j - 1)] + vec2(segmentRadii[j] * cos(angle), segmentRadii[j - 1] * sin(angle));
                vec2 p2 = segmentPosition + vec2(segmentRadii[j] * cos(angle), segmentRadii[j] * sin(angle));

                fishBodyPolygon[numHeadPoints + j - 1] = p2;
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
            fishBodyPolygon[(numSegments + 2*numHeadPoints - 1) + (numSegments - 1 - j)] = p2;
        }

        if (pointInBodyPolygon(uv))
        {
            return vec3(1.0, 0.7, 0.0);
        }
        
        // Draw Front Fins
        vec2 segmentPosition = fishSegmentsPositions[i * numSegments + 1];
        vec2 diff = segmentPosition - fishSegmentsPositions[i * numSegments];
        float parentAngle = atan(diff.y , diff.x);
        float angle = parentAngle + pi / 2.0;


        vec2 p1 = fishSegmentsPositions[i * numSegments + 1] + vec2(segmentRadii[1] * cos(angle), segmentRadii[1] * sin(angle));
        angle = parentAngle - pi / 2.0;
        vec2 p2 = fishSegmentsPositions[i * numSegments + 1] + vec2(segmentRadii[1] * cos(angle), segmentRadii[1] * sin(angle));

        if (insideEllipse(uv, p1, 0.015, 0.005, parentAngle + pi / 4.0))
        {
            return vec3(1.0, 0.7, 0.2);
        }

        if (insideEllipse(uv, p2, 0.015, 0.005, parentAngle + pi - pi / 4.0))
        {
            return vec3(1.0, 0.7, 0.2);
        }

        // Draw Rear Fins
        segmentPosition = fishSegmentsPositions[i * numSegments + 5];
        diff = segmentPosition - fishSegmentsPositions[i * numSegments + 4];
        parentAngle = atan(diff.y , diff.x);
        angle = parentAngle + pi / 2.0;


        p1 = fishSegmentsPositions[i * numSegments + 4] + vec2(segmentRadii[5] * cos(angle), segmentRadii[5] * sin(angle));
        angle = parentAngle - pi / 2.0;
        p2 = fishSegmentsPositions[i * numSegments + 4] + vec2(segmentRadii[5] * cos(angle), segmentRadii[5] * sin(angle));

        if (insideEllipse(uv, p1, 0.01, 0.0035, parentAngle * 1.1 + pi / 4.0))
        {
            return vec3(1.0, 0.7, 0.3);
        }

        if (insideEllipse(uv, p2, 0.01, 0.0035, parentAngle * 1.1 + pi - pi / 4.0))
        {
            return vec3(1.0, 0.7, 0.3);
        }


        // Draw Tail
        fishTailPolygon[0] = lastTailPoint;
        fishTailPolygon[numFishTailPoints - 1] = lastTailPoint;

        vec2 p = lastTailPoint + vec2(0.03*cos(lastTailSegmentAngle), 0.03*sin(lastTailSegmentAngle));
        fishTailPolygon[1] = p;

        if (sqrt(pow(p.x - uv.x, 2.0) + pow(p.y - uv.y, 2.0)) < 0.001)
        {
            return vec3(1.0, 0.0, 0.0);
        }
        

        diff = fishSegmentsPositions[i * numSegments + 5] - fishSegmentsPositions[i * numSegments + 4];
        angle = atan(diff.y, diff.x);

        p = lastTailPoint + vec2(0.03*cos(lastTailSegmentAngle+angle), 0.03*sin(lastTailSegmentAngle+angle));
        fishTailPolygon[2] = p;

        if (sqrt(pow(p.x - uv.x, 2.0) + pow(p.y - uv.y, 2.0)) < 0.001)
        {
            return vec3(0.0, 0.0, 1.0);
        }

        if (pointInTailPolygon(uv))
        {
            return vec3(0.7, 0.5, 0.3);
        }

    }


    return vec3(0.0, 0.7, 1.0);
}


void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xx;
    float alpha = 0.7;
    vec3 color1 = drawFishes(uv);
    // vec3 color2 = drawEllipse(uv, vec2(0.5, 0.25), 0.01, 0.02, 0.5 * sin(u_time) * pi / 4.0);
    // vec3 color3 = drawVelocity(uv);




    // gl_FragColor = vec4(color1 * alpha + (1.0 - alpha) * color2, 1.0);
    gl_FragColor = vec4(color1, 1.0);
}