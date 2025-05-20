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
const int numFishPoints = (numSegments - 1)*2 + numHeadPoints + 1;
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


vec3 drawFishes(vec2 uv)
{
    // const int values[5] = int[5](2.0,  4.0, 0.0, 4.0, 2.0);
    for (int i = 0; i < 100; i++)
    {
        if (i >= numFishes) break;
        for (int j = 0; j < numSegments; j++)
        {
            vec2 segmentPosition = fishSegmentsPositions[i * numSegments + j];
            if (j == 0)
            {
                for (int k = 0; k < numHeadPoints; k++)
                {
                    float angle = fishHeadings[i] + headPointAngles[k];
                    vec2 p = segmentPosition + vec2(segmentRadii[j] * cos(angle), segmentRadii[j] * sin(angle));
                    fishBodyPolygon[k] = p;
                    if (k == 0)
                    {
                        fishBodyPolygon[numFishPoints - 1] = p;
                    }
                }

            }
            else{

                vec2 diff = segmentPosition - fishSegmentsPositions[i * numSegments + (j - 1)];
                float parentAngle = atan(diff.y , diff.x);
                float angle = parentAngle - pi / 2.0;
                vec2 p1 = fishSegmentsPositions[i * numSegments + (j - 1)] + vec2(segmentRadii[j] * cos(angle), segmentRadii[j - 1] * sin(angle));
                vec2 p2 = segmentPosition + vec2(segmentRadii[j] * cos(angle), segmentRadii[j] * sin(angle));

                fishBodyPolygon[numHeadPoints + j - 1] = p2;
                // if (j == 1)
                // {
                //     fishBodyPolygon[numFishPoints - 1] = p2;
                // }
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
            fishBodyPolygon[(numSegments + numHeadPoints - 1) + (numSegments - 1 - j)] = p2;
        }

        if (pointInPolygon(uv))
        {
            return vec3(0.0, 0.7, 0.0);
        }
    }
    return vec3(0.0, 0.7, 1.0);
}


vec3 drawVelocity(vec2 uv)
{
    float x1 = 0.5;
    float y1 = 0.5;

    float x2 = x1 + 0.1*cos(fishHeadings[0]);
    float y2 = y1 + 0.1*sin(fishHeadings[0]);

    float m = (y2 - y1) / (x2 - x1); 
    float c = y1 - m*x1;

    float predY = uv.x*m + c;

    if (uv.x > x1 && uv.x < x2)
    {
        return vec3(1.0, 0.0, 0.0);
    }

    return vec3(0.0, 0.0, 0.0);
}


void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xx;
    vec3 color1 = drawFishes(uv);
    // vec3 color2 = drawFishesCircles(uv);
    // float alpha = 0.7;
    // vec3 color3 = drawVelocity(uv);




    // gl_FragColor = vec4(color1 * alpha + (1.0 - alpha) * color2, 1.0);
    gl_FragColor = vec4(color1, 1.0);
}