// this is the fragment (or pixel) shader that 
// outputs constant red color for every pixel rendered.

precision mediump float; 
    // sets the precision for floating point computation

// The object that fetches data from texture.
// Must be set outside the shader.
uniform sampler2D uSampler;

// Color of pixel
uniform vec4 uPixelColor;  
uniform bool uBlendColor;

// coming from Vertex Shader
varying vec4 vColorValue;
varying vec2 vTexCoord;

void main(void) {
    // now do texture lookup with the web-gl utility
    vec4 c = texture2D(uSampler, vec2(vTexCoord.s, vTexCoord.t));
    
    // for every pixel called sets to the user specified color
    if (uBlendColor)
        gl_FragColor = vec4((c.rgb * (1.0-uPixelColor.a) + uPixelColor.rgb * uPixelColor.a), c.a);
    else
        gl_FragColor = c;
        
}