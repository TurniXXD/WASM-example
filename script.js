let wasmExports; //outside so you can acces it everywhere

//memory available to WASM, memory object provide that provides 256 pages of memory
let wasmMemory = new WebAssembly.Memory({initial: 256, maximum: 256});

let wasmTable = new WebAssembly.Table({
	'initial': 1,
	'maximum': 1,
	'element': 'anyfunc'
});

//second value for info object
let asmLibraryArg = {
	"__handle_stack_overflow": ()=>{}, //used to log messages when this moment occurs
	"emscripten_resize_heap": ()=>{}, //function if memory allocation exceeds its limit
	"__lock": ()=>{},
	"__unlock": ()=>{},
	"memory": wasmMemory,
	"table": wasmTable
}

//info object 
let info = {
	'env': asmLibraryArg,
	'wasi_snapshot_preview1': asmLibraryArg
}

//load Wasm
async function loadWasm() {
	let res = await fetch('arithmetic.wasm');
	let bytes = await res.arrayBuffer(); //fetch bytes array too
	let wasmObj = await WebAssembly.instantiate(bytes, info); //creates new Wasm object from let bytes
	wasmExports = wasmObj.instance.exports; //export var for accesing C functions
}

loadWasm();