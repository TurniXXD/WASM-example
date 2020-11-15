#include <emscripten.h>

EMSCRIPTEN_KEEPALIVE
float add (float x, float y) {
	return x + y;
}

EMSCRIPTEN_KEEPALIVE
float multiply (float x, float y) {
	return x * y;
}

EMSCRIPTEN_KEEPALIVE
float substract (float x, float y) {
	return x - y;
}

EMSCRIPTEN_KEEPALIVE
float divide (float x, float y) {
	return x / y;
}

