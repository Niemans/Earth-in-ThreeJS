varying vec2 vertexUV;

uniform float time;

void main() {

    float dash = sin(vertexUV.x*100.0 - time);

    if(dash < 0.0) discard;

    gl_FragColor = vec4(1.0,0.0,0.0,1.0);
}