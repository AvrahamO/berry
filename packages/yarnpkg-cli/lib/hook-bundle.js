module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const module_1 = __importDefault(__webpack_require__(1));
const path_1 = __importDefault(__webpack_require__(2));
const string_decoder_1 = __importDefault(__webpack_require__(3));
const applyPatch_1 = __webpack_require__(4);
const hydrateRuntimeState_1 = __webpack_require__(20);
const makeApi_1 = __webpack_require__(21);
module.exports = makeApi_1.makeApi($$SETUP_STATE(hydrateRuntimeState_1.hydrateRuntimeState), {
    compatibilityMode: true,
    pnpapiResolution: path_1.default.resolve(__dirname, __filename),
});
if (__non_webpack_module__.parent && __non_webpack_module__.parent.id === 'internal/preload') {
    applyPatch_1.applyPatch(module.exports, {
        compatibilityMode: true,
    });
    if (__non_webpack_module__.filename) {
        // We delete it from the cache in order to support the case where the CLI resolver is invoked from "yarn run"
        // It's annoying because it might cause some issues when the file is multiple times in NODE_OPTIONS, but it shouldn't happen anyway.
        delete module_1.default._cache[__non_webpack_module__.filename];
    }
}
// @ts-ignore
if (process.mainModule === __non_webpack_module__) {
    const reportError = (code, message, data) => {
        process.stdout.write(`${JSON.stringify([{ code, message, data }, null])}\n`);
    };
    const reportSuccess = (resolution) => {
        process.stdout.write(`${JSON.stringify([null, resolution])}\n`);
    };
    const processResolution = (request, issuer) => {
        try {
            reportSuccess(module.exports.resolveRequest(request, issuer));
        }
        catch (error) {
            reportError(error.code, error.message, error.data);
        }
    };
    const processRequest = (data) => {
        try {
            const [request, issuer] = JSON.parse(data);
            processResolution(request, issuer);
        }
        catch (error) {
            reportError(`INVALID_JSON`, error.message, error.data);
        }
    };
    if (process.argv.length > 2) {
        if (process.argv.length !== 4) {
            process.stderr.write(`Usage: ${process.argv[0]} ${process.argv[1]} <request> <issuer>\n`);
            process.exitCode = 64; /* EX_USAGE */
        }
        else {
            processResolution(process.argv[2], process.argv[3]);
        }
    }
    else {
        let buffer = '';
        const decoder = new string_decoder_1.default.StringDecoder();
        process.stdin.on('data', chunk => {
            buffer += decoder.write(chunk);
            do {
                const index = buffer.indexOf('\n');
                if (index === -1)
                    break;
                const line = buffer.slice(0, index);
                buffer = buffer.slice(index + 1);
                processRequest(line);
            } while (true);
        });
    }
}


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("module");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("string_decoder");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fslib_1 = __webpack_require__(5);
const fs_1 = __importDefault(__webpack_require__(7));
const module_1 = __importDefault(__webpack_require__(1));
const path_1 = __importDefault(__webpack_require__(2));
const internalTools_1 = __webpack_require__(19);
function applyPatch(pnpapi, opts) {
    // @ts-ignore
    const builtinModules = new Set(module_1.default.builtinModules || Object.keys(process.binding('natives')));
    // The callback function gets called to wrap the return value of the module names matching the regexp
    const patchedModules = [];
    if (opts.compatibilityMode) {
        // Modern versions of `resolve` support a specific entry point that custom resolvers can use
        // to inject a specific resolution logic without having to patch the whole package.
        //
        // Cf: https://github.com/browserify/resolve/pull/174
        patchedModules.push([
            /^\.\/normalize-options\.js$/,
            (issuer, normalizeOptions) => {
                if (!issuer || issuer.name !== 'resolve')
                    return normalizeOptions;
                return (request, opts) => {
                    opts = opts || {};
                    if (opts.forceNodeResolution)
                        return opts;
                    opts.preserveSymlinks = true;
                    opts.paths = function (request, basedir, getNodeModulesDir, opts) {
                        // Extract the name of the package being requested (1=full name, 2=scope name, 3=local name)
                        const parts = request.match(/^((?:(@[^\/]+)\/)?([^\/]+))/);
                        if (!parts)
                            throw new Error(`Assertion failed: Expected the "resolve" package to call the "paths" callback with package names only (got "${request}")`);
                        // make sure that basedir ends with a slash
                        if (basedir.charAt(basedir.length - 1) !== '/')
                            basedir = path_1.default.join(basedir, '/');
                        // This is guaranteed to return the path to the "package.json" file from the given package
                        const manifestPath = pnpapi.resolveToUnqualified(`${parts[1]}/package.json`, basedir, {
                            considerBuiltins: false,
                        });
                        if (manifestPath === null)
                            throw new Error(`Assertion failed: The resolution thinks that "${parts[1]}" is a Node builtin`);
                        // The first dirname strips the package.json, the second strips the local named folder
                        let nodeModules = path_1.default.dirname(path_1.default.dirname(manifestPath));
                        // Strips the scope named folder if needed
                        if (parts[2])
                            nodeModules = path_1.default.dirname(nodeModules);
                        return [nodeModules];
                    };
                    return opts;
                };
            },
        ]);
    }
    /**
     * Used to disable the resolution hooks (for when we want to fallback to the previous resolution - we then need
     * a way to "reset" the environment temporarily)
     */
    let enableNativeHooks = true;
    // @ts-ignore
    process.versions.pnp = String(pnpapi.VERSIONS.std);
    // A small note: we don't replace the cache here (and instead use the native one). This is an effort to not
    // break code similar to "delete require.cache[require.resolve(FOO)]", where FOO is a package located outside
    // of the Yarn dependency tree. In this case, we defer the load to the native loader. If we were to replace the
    // cache by our own, the native loader would populate its own cache, which wouldn't be exposed anymore, so the
    // delete call would be broken.
    const originalModuleLoad = module_1.default._load;
    module_1.default._load = function (request, parent, isMain) {
        if (!enableNativeHooks) {
            return originalModuleLoad.call(module_1.default, request, parent, isMain);
        }
        // Builtins are managed by the regular Node loader
        if (builtinModules.has(request)) {
            try {
                enableNativeHooks = false;
                return originalModuleLoad.call(module_1.default, request, parent, isMain);
            }
            finally {
                enableNativeHooks = true;
            }
        }
        // The 'pnpapi' name is reserved to return the PnP api currently in use by the program
        if (request === `pnpapi`)
            return pnpapi;
        // Request `Module._resolveFilename` (ie. `resolveRequest`) to tell us which file we should load
        const modulePath = module_1.default._resolveFilename(request, parent, isMain);
        // Check if the module has already been created for the given file
        const cacheEntry = module_1.default._cache[modulePath];
        if (cacheEntry)
            return cacheEntry.exports;
        // Create a new module and store it into the cache
        // @ts-ignore
        const module = new module_1.default(modulePath, parent);
        module_1.default._cache[modulePath] = module;
        // The main module is exposed as global variable
        if (isMain) {
            // @ts-ignore
            process.mainModule = module;
            module.id = '.';
        }
        // Try to load the module, and remove it from the cache if it fails
        let hasThrown = true;
        try {
            module.load(modulePath);
            hasThrown = false;
        }
        finally {
            if (hasThrown) {
                delete module_1.default._cache[modulePath];
            }
        }
        // Some modules might have to be patched for compatibility purposes
        for (const [filter, patchFn] of patchedModules)
            if (filter.test(request))
                module.exports = patchFn(parent && parent.filename ? pnpapi.findPackageLocator(parent.filename) : null, module.exports);
        return module.exports;
    };
    const originalModuleResolveFilename = module_1.default._resolveFilename;
    module_1.default._resolveFilename = function (request, parent, isMain, options) {
        if (request === `pnpapi`)
            return request;
        if (!enableNativeHooks)
            return originalModuleResolveFilename.call(module_1.default, request, parent, isMain, options);
        if (options && options.plugnplay === false) {
            try {
                enableNativeHooks = false;
                return originalModuleResolveFilename.call(module_1.default, request, parent, isMain, options);
            }
            finally {
                enableNativeHooks = true;
            }
        }
        let issuers;
        if (options) {
            const optionNames = new Set(Object.keys(options));
            optionNames.delete(`paths`);
            optionNames.delete(`plugnplay`);
            if (optionNames.size > 0) {
                throw internalTools_1.makeError(`UNSUPPORTED`, `Some options passed to require() aren't supported by PnP yet (${Array.from(optionNames).join(', ')})`);
            }
            if (options.paths) {
                issuers = options.paths.map((entry) => {
                    return `${path_1.default.normalize(entry)}/`;
                });
            }
        }
        if (!issuers) {
            const issuerModule = internalTools_1.getIssuerModule(parent);
            const issuer = issuerModule ? issuerModule.filename : `${process.cwd()}/`;
            issuers = [issuer];
        }
        let firstError;
        for (const issuer of issuers) {
            let resolution;
            try {
                resolution = pnpapi.resolveRequest(request, issuer);
            }
            catch (error) {
                firstError = firstError || error;
                continue;
            }
            return resolution !== null ? resolution : request;
        }
        throw firstError;
    };
    const originalFindPath = module_1.default._findPath;
    module_1.default._findPath = function (request, paths, isMain) {
        if (request === `pnpapi`)
            return false;
        if (!enableNativeHooks)
            return originalFindPath.call(module_1.default, request, paths, isMain);
        for (const path of paths) {
            let resolution;
            try {
                resolution = pnpapi.resolveRequest(request, path);
            }
            catch (error) {
                continue;
            }
            if (resolution) {
                return resolution;
            }
        }
        return false;
    };
    // The following aims to support the tsc binary.
    if (opts.compatibilityMode) {
        // @ts-ignore
        const originalCompile = module_1.default.prototype._compile;
        let setupTscEnvironment = () => {
            // @ts-ignore
            const tscTs = global.tscTs = {};
            let realNodeModuleNameResolver;
            let fakeNodeModuleNameResolver = function (...args) {
                console.log(args);
                return realNodeModuleNameResolver.apply(this, args);
            };
            Object.defineProperty(tscTs, `nodeModuleNameResolver`, {
                set: (v) => realNodeModuleNameResolver = v,
                get: () => fakeNodeModuleNameResolver,
            });
            setupTscEnvironment = () => { };
        };
        // @ts-ignore
        module_1.default.prototype._compile = function (content, filename) {
            if (typeof filename === `string` && filename.endsWith(`tsc.js`)) {
                setupTscEnvironment();
                content = `var ts = global.tscTs;\n\n${content}`;
            }
            return originalCompile.call(this, content, filename);
        };
    }
    // We must copy the fs into a local, because otherwise
    // 1. we would make the NodeFS instance use the function that we patched (infinite loop)
    // 2. Object.create(fs) isn't enough, since it won't prevent the proto from being modified
    const localFs = Object.assign({}, fs_1.default);
    const nodeFs = new fslib_1.NodeFS(localFs);
    fslib_1.patchFs(fs_1.default, new fslib_1.ZipOpenFS({ baseFs: nodeFs }));
}
exports.applyPatch = applyPatch;
;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const NodeFS_1 = __webpack_require__(6);
var AliasFS_1 = __webpack_require__(9);
exports.AliasFS = AliasFS_1.AliasFS;
var CwdFS_1 = __webpack_require__(10);
exports.CwdFS = CwdFS_1.CwdFS;
var JailFS_1 = __webpack_require__(11);
exports.JailFS = JailFS_1.JailFS;
var NodeFS_2 = __webpack_require__(6);
exports.NodeFS = NodeFS_2.NodeFS;
var FakeFS_1 = __webpack_require__(8);
exports.FakeFS = FakeFS_1.FakeFS;
var ZipFS_1 = __webpack_require__(12);
exports.ZipFS = ZipFS_1.ZipFS;
var ZipOpenFS_1 = __webpack_require__(18);
exports.ZipOpenFS = ZipOpenFS_1.ZipOpenFS;
function wrapSync(fn) {
    return fn;
}
function wrapAsync(fn) {
    return function (...args) {
        const cb = typeof args[args.length - 1] === `function`
            ? args.pop()
            : null;
        setImmediate(() => {
            let error, result;
            try {
                result = fn(...args);
            }
            catch (caught) {
                error = caught;
            }
            cb(error, result);
        });
    };
}
function patchFs(patchedFs, fakeFs) {
    const SYNC_IMPLEMENTATIONS = new Set([
        `createReadStream`,
        `chmodSync`,
        `copyFileSync`,
        `lstatSync`,
        `openSync`,
        `readlinkSync`,
        `readFileSync`,
        `readdirSync`,
        `readlinkSync`,
        `realpathSync`,
        `rmdirSync`,
        `statSync`,
        `symlinkSync`,
        `unlinkSync`,
        `utimesSync`,
        `writeFileSync`,
    ]);
    const ASYNC_IMPLEMENTATIONS = new Set([
        `chmodPromise`,
        `copyFilePromise`,
        `lstatPromise`,
        `openPromise`,
        `readdirPromise`,
        `realpathPromise`,
        `readFilePromise`,
        `readdirPromise`,
        `readlinkPromise`,
        `rmdirPromise`,
        `statPromise`,
        `symlinkPromise`,
        `unlinkPromise`,
        `utimesPromise`,
        `writeFilePromise`,
    ]);
    patchedFs.existsSync = (p) => {
        try {
            return fakeFs.existsSync(p);
        }
        catch (error) {
            return false;
        }
    };
    patchedFs.exists = (p, callback) => {
        fakeFs.existsPromise(p).then(result => {
            if (callback) {
                callback(result);
            }
        }, () => {
            if (callback) {
                callback(false);
            }
        });
    };
    for (const fnName of ASYNC_IMPLEMENTATIONS) {
        const fakeImpl = fakeFs[fnName].bind(fakeFs);
        const origName = fnName.replace(/Promise$/, ``);
        patchedFs[origName] = (...args) => {
            const hasCallback = typeof args[args.length - 1] === `function`;
            const callback = hasCallback ? args.pop() : () => { };
            fakeImpl(...args).then((result) => {
                callback(undefined, result);
            }, (error) => {
                callback(error);
            });
        };
    }
    for (const fnName of SYNC_IMPLEMENTATIONS) {
        const fakeImpl = fakeFs[fnName].bind(fakeFs);
        const origName = fnName;
        patchedFs[origName] = fakeImpl;
    }
    patchedFs.realpathSync.native = patchedFs.realpathSync;
    patchedFs.realpath.native = patchedFs.realpath;
}
exports.patchFs = patchFs;
function extendFs(realFs, fakeFs) {
    const patchedFs = Object.create(realFs);
    patchFs(patchedFs, fakeFs);
    return patchedFs;
}
exports.extendFs = extendFs;
exports.xfs = new NodeFS_1.NodeFS();


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(__webpack_require__(7));
const FakeFS_1 = __webpack_require__(8);
class NodeFS extends FakeFS_1.FakeFS {
    constructor(realFs = fs_1.default) {
        super();
        this.realFs = realFs;
    }
    getRealPath() {
        return `/`;
    }
    async openPromise(p, flags, mode) {
        return await new Promise((resolve, reject) => {
            this.realFs.open(p, flags, mode, this.makeCallback(resolve, reject));
        });
    }
    openSync(p, flags, mode) {
        return this.realFs.openSync(p, flags, mode);
    }
    async closePromise(fd) {
        await new Promise((resolve, reject) => {
            this.realFs.close(fd, this.makeCallback(resolve, reject));
        });
    }
    closeSync(fd) {
        this.realFs.closeSync(fd);
    }
    createReadStream(p, opts) {
        return this.realFs.createReadStream(this.fromPortablePath(p), opts);
    }
    createWriteStream(p, opts) {
        return this.realFs.createWriteStream(this.fromPortablePath(p), opts);
    }
    async realpathPromise(p) {
        return await new Promise((resolve, reject) => {
            this.realFs.realpath(p, {}, this.makeCallback(resolve, reject));
        });
    }
    realpathSync(p) {
        return this.toPortablePath(this.realFs.realpathSync(this.fromPortablePath(p), {}));
    }
    async existsPromise(p) {
        return await new Promise(resolve => {
            this.realFs.exists(this.fromPortablePath(p), resolve);
        });
    }
    existsSync(p) {
        return this.realFs.existsSync(this.fromPortablePath(p));
    }
    async statPromise(p) {
        return await new Promise((resolve, reject) => {
            this.realFs.stat(p, this.makeCallback(resolve, reject));
        });
    }
    statSync(p) {
        return this.realFs.statSync(this.fromPortablePath(p));
    }
    async lstatPromise(p) {
        return await new Promise((resolve, reject) => {
            this.realFs.lstat(p, this.makeCallback(resolve, reject));
        });
    }
    lstatSync(p) {
        return this.realFs.lstatSync(this.fromPortablePath(p));
    }
    async chmodPromise(p, mask) {
        return await new Promise((resolve, reject) => {
            this.realFs.chmod(this.fromPortablePath(p), mask, this.makeCallback(resolve, reject));
        });
    }
    chmodSync(p, mask) {
        return this.realFs.chmodSync(this.fromPortablePath(p), mask);
    }
    async renamePromise(oldP, newP) {
        return await new Promise((resolve, reject) => {
            this.realFs.rename(this.fromPortablePath(oldP), this.fromPortablePath(newP), this.makeCallback(resolve, reject));
        });
    }
    renameSync(oldP, newP) {
        return this.realFs.renameSync(this.fromPortablePath(oldP), this.fromPortablePath(newP));
    }
    async copyFilePromise(sourceP, destP, flags = 0) {
        return await new Promise((resolve, reject) => {
            this.realFs.copyFile(this.fromPortablePath(sourceP), this.fromPortablePath(destP), flags, this.makeCallback(resolve, reject));
        });
    }
    copyFileSync(sourceP, destP, flags = 0) {
        return this.realFs.copyFileSync(this.fromPortablePath(sourceP), this.fromPortablePath(destP), flags);
    }
    async writeFilePromise(p, content, opts) {
        return await new Promise((resolve, reject) => {
            if (opts) {
                this.realFs.writeFile(p, content, opts, this.makeCallback(resolve, reject));
            }
            else {
                this.realFs.writeFile(p, content, this.makeCallback(resolve, reject));
            }
        });
    }
    writeFileSync(p, content, opts) {
        if (opts) {
            this.realFs.writeFileSync(this.fromPortablePath(p), content, opts);
        }
        else {
            this.realFs.writeFileSync(this.fromPortablePath(p), content);
        }
    }
    async unlinkPromise(p) {
        return await new Promise((resolve, reject) => {
            this.realFs.unlink(p, this.makeCallback(resolve, reject));
        });
    }
    unlinkSync(p) {
        return this.realFs.unlinkSync(this.fromPortablePath(p));
    }
    async utimesPromise(p, atime, mtime) {
        return await new Promise((resolve, reject) => {
            this.realFs.utimes(p, atime, mtime, this.makeCallback(resolve, reject));
        });
    }
    utimesSync(p, atime, mtime) {
        this.realFs.utimesSync(p, atime, mtime);
    }
    async mkdirPromise(p) {
        return await new Promise((resolve, reject) => {
            this.realFs.mkdir(p, this.makeCallback(resolve, reject));
        });
    }
    mkdirSync(p) {
        return this.realFs.mkdirSync(this.fromPortablePath(p));
    }
    async rmdirPromise(p) {
        return await new Promise((resolve, reject) => {
            this.realFs.rmdir(p, this.makeCallback(resolve, reject));
        });
    }
    rmdirSync(p) {
        return this.realFs.rmdirSync(this.fromPortablePath(p));
    }
    async symlinkPromise(target, p) {
        return await new Promise((resolve, reject) => {
            this.realFs.symlink(target, this.fromPortablePath(p), this.makeCallback(resolve, reject));
        });
    }
    symlinkSync(target, p) {
        return this.realFs.symlinkSync(target, this.fromPortablePath(p));
    }
    async readFilePromise(p, encoding) {
        return await new Promise((resolve, reject) => {
            this.realFs.readFile(this.fromPortablePath(p), encoding, this.makeCallback(resolve, reject));
        });
    }
    readFileSync(p, encoding) {
        return this.realFs.readFileSync(this.fromPortablePath(p), encoding);
    }
    async readdirPromise(p) {
        return await new Promise((resolve, reject) => {
            this.realFs.readdir(p, this.makeCallback(resolve, reject));
        });
    }
    readdirSync(p) {
        return this.realFs.readdirSync(this.fromPortablePath(p));
    }
    async readlinkPromise(p) {
        return await new Promise((resolve, reject) => {
            this.realFs.readlink(p, this.makeCallback(resolve, reject));
        });
    }
    readlinkSync(p) {
        return this.realFs.readlinkSync(this.fromPortablePath(p));
    }
    makeCallback(resolve, reject) {
        return (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        };
    }
    fromPortablePath(p) {
        return p;
    }
    toPortablePath(p) {
        return p;
    }
}
exports.NodeFS = NodeFS;


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __webpack_require__(2);
class FakeFS {
    resolve(p) {
        return path_1.posix.resolve(`/`, p);
    }
    async removePromise(p) {
        let stat;
        try {
            stat = await this.lstatPromise(p);
        }
        catch (error) {
            if (error.code === `ENOENT`) {
                return;
            }
            else {
                throw error;
            }
        }
        if (stat.isDirectory()) {
            for (const entry of await this.readdirPromise(p))
                await this.removePromise(path_1.posix.resolve(p, entry));
            await this.rmdirPromise(p);
        }
        else {
            await this.unlinkPromise(p);
        }
    }
    removeSync(p) {
        let stat;
        try {
            stat = this.lstatSync(p);
        }
        catch (error) {
            if (error.code === `ENOENT`) {
                return;
            }
            else {
                throw error;
            }
        }
        if (stat.isDirectory()) {
            for (const entry of this.readdirSync(p))
                this.removeSync(path_1.posix.resolve(p, entry));
            this.rmdirSync(p);
        }
        else {
            this.unlinkSync(p);
        }
    }
    async mkdirpPromise(p, { chmod, utimes } = {}) {
        p = this.resolve(p);
        if (p === `/`)
            return;
        const parts = p.split(`/`);
        for (let u = 2; u <= parts.length; ++u) {
            const subPath = parts.slice(0, u).join(`/`);
            if (!this.existsSync(subPath)) {
                try {
                    await this.mkdirPromise(subPath);
                }
                catch (error) {
                    if (error.code === `EEXIST`) {
                        continue;
                    }
                    else {
                        throw error;
                    }
                }
                if (chmod != null)
                    await this.chmodPromise(subPath, chmod);
                if (utimes != null) {
                    await this.utimesPromise(subPath, utimes[0], utimes[1]);
                }
            }
        }
    }
    mkdirpSync(p, { chmod, utimes } = {}) {
        p = this.resolve(p);
        if (p === `/`)
            return;
        const parts = p.split(`/`);
        for (let u = 2; u <= parts.length; ++u) {
            const subPath = parts.slice(0, u).join(`/`);
            if (!this.existsSync(subPath)) {
                try {
                    this.mkdirSync(subPath);
                }
                catch (error) {
                    if (error.code === `EEXIST`) {
                        continue;
                    }
                    else {
                        throw error;
                    }
                }
                if (chmod != null)
                    this.chmodSync(subPath, chmod);
                if (utimes != null) {
                    this.utimesSync(subPath, utimes[0], utimes[1]);
                }
            }
        }
    }
    async copyPromise(destination, source, { baseFs = this, overwrite = true } = {}) {
        const stat = await baseFs.lstatPromise(source);
        if (stat.isDirectory()) {
            await this.mkdirpPromise(destination);
            const directoryListing = await baseFs.readdirPromise(source);
            await Promise.all(directoryListing.map(entry => {
                return this.copyPromise(path_1.posix.join(destination, entry), path_1.posix.join(source, entry), { baseFs, overwrite });
            }));
        }
        else if (stat.isFile()) {
            if (!await this.existsPromise(destination) || overwrite) {
                const content = await baseFs.readFilePromise(source);
                await this.writeFilePromise(destination, content);
            }
        }
        else {
            throw new Error(`Unsupported file type (file: ${source}, mode: 0o${stat.mode.toString(8).padStart(6, `0`)})`);
        }
        const mode = stat.mode & 0o777;
        await this.chmodPromise(destination, mode);
    }
    copySync(destination, source, { baseFs = this, overwrite = true } = {}) {
        const stat = baseFs.lstatSync(source);
        if (stat.isDirectory()) {
            this.mkdirpSync(destination);
            const directoryListing = baseFs.readdirSync(source);
            for (const entry of directoryListing) {
                this.copySync(path_1.posix.join(destination, entry), path_1.posix.join(source, entry), { baseFs, overwrite });
            }
        }
        else if (stat.isFile()) {
            if (!this.existsSync(destination) || overwrite) {
                const content = baseFs.readFileSync(source);
                this.writeFileSync(destination, content);
            }
        }
        else {
            throw new Error(`Unsupported file type (file: ${source}, mode: 0o${stat.mode.toString(8).padStart(6, `0`)})`);
        }
        const mode = stat.mode & 0o777;
        this.chmodSync(destination, mode);
    }
    async changeFilePromise(p, content) {
        try {
            const current = await this.readFilePromise(p, `utf8`);
            if (current === content) {
                return;
            }
        }
        catch (error) {
            // ignore errors, no big deal
        }
        await this.writeFilePromise(p, content);
    }
    changeFileSync(p, content) {
        try {
            const current = this.readFileSync(p, `utf8`);
            if (current === content) {
                return;
            }
        }
        catch (error) {
            // ignore errors, no big deal
        }
        this.writeFileSync(p, content);
    }
    async movePromise(fromP, toP) {
        try {
            await this.renamePromise(fromP, toP);
        }
        catch (error) {
            if (error.code === `EXDEV`) {
                await this.copyPromise(toP, fromP);
                await this.removePromise(fromP);
            }
            else {
                throw error;
            }
        }
    }
    moveSync(fromP, toP) {
        try {
            this.renameSync(fromP, toP);
        }
        catch (error) {
            if (error.code === `EXDEV`) {
                this.copySync(toP, fromP);
                this.removeSync(fromP);
            }
            else {
                throw error;
            }
        }
    }
    async lockPromise(affectedPath, callback) {
        const lockPath = `${affectedPath}.lock`;
        const interval = 1000 / 60;
        const timeout = Date.now() + 60 * 1000;
        let fd = null;
        while (fd === null) {
            try {
                fd = await this.openPromise(lockPath, `wx`);
            }
            catch (error) {
                if (error.code === `EEXIST`) {
                    if (Date.now() < timeout) {
                        await new Promise(resolve => setTimeout(resolve, interval));
                    }
                    else {
                        throw new Error(`Couldn't acquire a lock in a reasonable time (${timeout / 1000}s)`);
                    }
                }
                else {
                    throw error;
                }
            }
        }
        try {
            await callback();
        }
        finally {
            await this.closePromise(fd);
            await this.unlinkPromise(lockPath);
        }
    }
}
exports.FakeFS = FakeFS;
;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const FakeFS_1 = __webpack_require__(8);
class AliasFS extends FakeFS_1.FakeFS {
    constructor(target, { baseFs }) {
        super();
        this.target = target;
        this.baseFs = baseFs;
    }
    getRealPath() {
        return this.target;
    }
    getBaseFs() {
        return this.baseFs;
    }
    async openPromise(p, flags, mode) {
        return await this.baseFs.openPromise(p, flags, mode);
    }
    openSync(p, flags, mode) {
        return this.baseFs.openSync(p, flags, mode);
    }
    async closePromise(fd) {
        await this.baseFs.closePromise(fd);
    }
    closeSync(fd) {
        this.baseFs.closeSync(fd);
    }
    createReadStream(p, opts) {
        return this.baseFs.createReadStream(p, opts);
    }
    createWriteStream(p, opts) {
        return this.baseFs.createWriteStream(p, opts);
    }
    async realpathPromise(p) {
        return await this.baseFs.realpathPromise(p);
    }
    realpathSync(p) {
        return this.baseFs.realpathSync(p);
    }
    async existsPromise(p) {
        return await this.baseFs.existsPromise(p);
    }
    existsSync(p) {
        return this.baseFs.existsSync(p);
    }
    async statPromise(p) {
        return await this.baseFs.statPromise(p);
    }
    statSync(p) {
        return this.baseFs.statSync(p);
    }
    async lstatPromise(p) {
        return await this.baseFs.lstatPromise(p);
    }
    lstatSync(p) {
        return this.baseFs.lstatSync(p);
    }
    async chmodPromise(p, mask) {
        return await this.baseFs.chmodPromise(p, mask);
    }
    chmodSync(p, mask) {
        return this.baseFs.chmodSync(p, mask);
    }
    async renamePromise(oldP, newP) {
        return await this.baseFs.renamePromise(oldP, newP);
    }
    renameSync(oldP, newP) {
        return this.baseFs.renameSync(oldP, newP);
    }
    async copyFilePromise(sourceP, destP, flags) {
        return await this.baseFs.copyFilePromise(sourceP, destP, flags);
    }
    copyFileSync(sourceP, destP, flags) {
        return this.baseFs.copyFileSync(sourceP, destP, flags);
    }
    async writeFilePromise(p, content, opts) {
        return await this.baseFs.writeFilePromise(p, content, opts);
    }
    writeFileSync(p, content, opts) {
        return this.baseFs.writeFileSync(p, content, opts);
    }
    async unlinkPromise(p) {
        return await this.baseFs.unlinkPromise(p);
    }
    unlinkSync(p) {
        return this.baseFs.unlinkSync(p);
    }
    async utimesPromise(p, atime, mtime) {
        return await this.baseFs.utimesPromise(p, atime, mtime);
    }
    utimesSync(p, atime, mtime) {
        return this.baseFs.utimesSync(p, atime, mtime);
    }
    async mkdirPromise(p) {
        return await this.baseFs.mkdirPromise(p);
    }
    mkdirSync(p) {
        return this.baseFs.mkdirSync(p);
    }
    async rmdirPromise(p) {
        return await this.baseFs.rmdirPromise(p);
    }
    rmdirSync(p) {
        return this.baseFs.rmdirSync(p);
    }
    async symlinkPromise(target, p) {
        return await this.baseFs.symlinkPromise(target, p);
    }
    symlinkSync(target, p) {
        return this.baseFs.symlinkSync(target, p);
    }
    async readFilePromise(p, encoding) {
        // This weird switch is required to tell TypeScript that the signatures are proper (otherwise it thinks that only the generic one is covered)
        switch (encoding) {
            case `utf8`:
                return await this.baseFs.readFilePromise(p, encoding);
            default:
                return await this.baseFs.readFilePromise(p, encoding);
        }
    }
    readFileSync(p, encoding) {
        // This weird switch is required to tell TypeScript that the signatures are proper (otherwise it thinks that only the generic one is covered)
        switch (encoding) {
            case `utf8`:
                return this.baseFs.readFileSync(p, encoding);
            default:
                return this.baseFs.readFileSync(p, encoding);
        }
    }
    async readdirPromise(p) {
        return await this.baseFs.readdirPromise(p);
    }
    readdirSync(p) {
        return this.baseFs.readdirSync(p);
    }
    async readlinkPromise(p) {
        return await this.baseFs.readlinkPromise(p);
    }
    readlinkSync(p) {
        return this.baseFs.readlinkSync(p);
    }
}
exports.AliasFS = AliasFS;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __webpack_require__(2);
const FakeFS_1 = __webpack_require__(8);
const NodeFS_1 = __webpack_require__(6);
class CwdFS extends FakeFS_1.FakeFS {
    constructor(target, { baseFs = new NodeFS_1.NodeFS() } = {}) {
        super();
        this.target = target;
        this.baseFs = baseFs;
    }
    getRealPath() {
        return path_1.posix.resolve(this.baseFs.getRealPath(), this.target);
    }
    getTarget() {
        return this.target;
    }
    getBaseFs() {
        return this.baseFs;
    }
    resolve(p) {
        return this.baseFs.resolve(this.fromCwdPath(p));
    }
    async openPromise(p, flags, mode) {
        return await this.baseFs.openPromise(this.fromCwdPath(p), flags, mode);
    }
    openSync(p, flags, mode) {
        return this.baseFs.openSync(this.fromCwdPath(p), flags, mode);
    }
    async closePromise(fd) {
        await this.baseFs.closePromise(fd);
    }
    closeSync(fd) {
        this.baseFs.closeSync(fd);
    }
    createReadStream(p, opts) {
        return this.baseFs.createReadStream(this.fromCwdPath(p), opts);
    }
    createWriteStream(p, opts) {
        return this.baseFs.createWriteStream(this.fromCwdPath(p), opts);
    }
    async realpathPromise(p) {
        return await this.baseFs.realpathPromise(this.fromCwdPath(p));
    }
    realpathSync(p) {
        return this.baseFs.realpathSync(this.fromCwdPath(p));
    }
    async existsPromise(p) {
        return await this.baseFs.existsPromise(this.fromCwdPath(p));
    }
    existsSync(p) {
        return this.baseFs.existsSync(this.fromCwdPath(p));
    }
    async statPromise(p) {
        return await this.baseFs.statPromise(this.fromCwdPath(p));
    }
    statSync(p) {
        return this.baseFs.statSync(this.fromCwdPath(p));
    }
    async lstatPromise(p) {
        return await this.baseFs.lstatPromise(this.fromCwdPath(p));
    }
    lstatSync(p) {
        return this.baseFs.lstatSync(this.fromCwdPath(p));
    }
    async chmodPromise(p, mask) {
        return await this.baseFs.chmodPromise(this.fromCwdPath(p), mask);
    }
    chmodSync(p, mask) {
        return this.baseFs.chmodSync(this.fromCwdPath(p), mask);
    }
    async renamePromise(oldP, newP) {
        return await this.baseFs.renamePromise(this.fromCwdPath(oldP), this.fromCwdPath(newP));
    }
    renameSync(oldP, newP) {
        return this.baseFs.renameSync(this.fromCwdPath(oldP), this.fromCwdPath(newP));
    }
    async copyFilePromise(sourceP, destP, flags) {
        return await this.baseFs.copyFilePromise(this.fromCwdPath(sourceP), this.fromCwdPath(destP), flags);
    }
    copyFileSync(sourceP, destP, flags) {
        return this.baseFs.copyFileSync(this.fromCwdPath(sourceP), this.fromCwdPath(destP), flags);
    }
    async writeFilePromise(p, content, opts) {
        return await this.baseFs.writeFilePromise(this.fromCwdPath(p), content, opts);
    }
    writeFileSync(p, content, opts) {
        return this.baseFs.writeFileSync(this.fromCwdPath(p), content, opts);
    }
    async unlinkPromise(p) {
        return await this.baseFs.unlinkPromise(this.fromCwdPath(p));
    }
    unlinkSync(p) {
        return this.baseFs.unlinkSync(this.fromCwdPath(p));
    }
    async utimesPromise(p, atime, mtime) {
        return await this.baseFs.utimesPromise(this.fromCwdPath(p), atime, mtime);
    }
    utimesSync(p, atime, mtime) {
        return this.baseFs.utimesSync(this.fromCwdPath(p), atime, mtime);
    }
    async mkdirPromise(p) {
        return await this.baseFs.mkdirPromise(this.fromCwdPath(p));
    }
    mkdirSync(p) {
        return this.baseFs.mkdirSync(this.fromCwdPath(p));
    }
    async rmdirPromise(p) {
        return await this.baseFs.rmdirPromise(this.fromCwdPath(p));
    }
    rmdirSync(p) {
        return this.baseFs.rmdirSync(this.fromCwdPath(p));
    }
    async symlinkPromise(target, p) {
        return await this.baseFs.symlinkPromise(target, this.fromCwdPath(p));
    }
    symlinkSync(target, p) {
        return this.baseFs.symlinkSync(target, this.fromCwdPath(p));
    }
    async readFilePromise(p, encoding) {
        // This weird switch is required to tell TypeScript that the signatures are proper (otherwise it thinks that only the generic one is covered)
        switch (encoding) {
            case `utf8`:
                return await this.baseFs.readFilePromise(this.fromCwdPath(p), encoding);
            default:
                return await this.baseFs.readFilePromise(this.fromCwdPath(p), encoding);
        }
    }
    readFileSync(p, encoding) {
        // This weird switch is required to tell TypeScript that the signatures are proper (otherwise it thinks that only the generic one is covered)
        switch (encoding) {
            case `utf8`:
                return this.baseFs.readFileSync(this.fromCwdPath(p), encoding);
            default:
                return this.baseFs.readFileSync(this.fromCwdPath(p), encoding);
        }
    }
    async readdirPromise(p) {
        return await this.baseFs.readdirPromise(this.fromCwdPath(p));
    }
    readdirSync(p) {
        return this.baseFs.readdirSync(this.fromCwdPath(p));
    }
    async readlinkPromise(p) {
        return await this.baseFs.readlinkPromise(this.fromCwdPath(p));
    }
    readlinkSync(p) {
        return this.baseFs.readlinkSync(this.fromCwdPath(p));
    }
    fromCwdPath(p) {
        return path_1.posix.resolve(this.getRealPath(), p);
    }
}
exports.CwdFS = CwdFS;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __webpack_require__(2);
const FakeFS_1 = __webpack_require__(8);
const NodeFS_1 = __webpack_require__(6);
class JailFS extends FakeFS_1.FakeFS {
    constructor(target, { baseFs = new NodeFS_1.NodeFS() } = {}) {
        super();
        this.target = path_1.posix.resolve(`/`, target);
        this.baseFs = baseFs;
    }
    getRealPath() {
        return path_1.posix.resolve(this.baseFs.getRealPath(), path_1.posix.relative(`/`, this.target));
    }
    getTarget() {
        return this.target;
    }
    getBaseFs() {
        return this.baseFs;
    }
    async openPromise(p, flags, mode) {
        return await this.baseFs.openPromise(this.fromJailedPath(p), flags, mode);
    }
    openSync(p, flags, mode) {
        return this.baseFs.openSync(this.fromJailedPath(p), flags, mode);
    }
    async closePromise(fd) {
        await this.baseFs.closePromise(fd);
    }
    closeSync(fd) {
        this.baseFs.closeSync(fd);
    }
    createReadStream(p, opts) {
        return this.baseFs.createReadStream(this.fromJailedPath(p), opts);
    }
    createWriteStream(p, opts) {
        return this.baseFs.createWriteStream(this.fromJailedPath(p), opts);
    }
    async realpathPromise(p) {
        return this.toJailedPath(await this.baseFs.realpathPromise(this.fromJailedPath(p)));
    }
    realpathSync(p) {
        return this.toJailedPath(this.baseFs.realpathSync(this.fromJailedPath(p)));
    }
    async existsPromise(p) {
        return await this.baseFs.existsPromise(this.fromJailedPath(p));
    }
    existsSync(p) {
        return this.baseFs.existsSync(this.fromJailedPath(p));
    }
    async statPromise(p) {
        return await this.baseFs.statPromise(this.fromJailedPath(p));
    }
    statSync(p) {
        return this.baseFs.statSync(this.fromJailedPath(p));
    }
    async lstatPromise(p) {
        return await this.baseFs.lstatPromise(this.fromJailedPath(p));
    }
    lstatSync(p) {
        return this.baseFs.lstatSync(this.fromJailedPath(p));
    }
    async chmodPromise(p, mask) {
        return await this.baseFs.chmodPromise(this.fromJailedPath(p), mask);
    }
    chmodSync(p, mask) {
        return this.baseFs.chmodSync(this.fromJailedPath(p), mask);
    }
    async renamePromise(oldP, newP) {
        return await this.baseFs.renamePromise(this.fromJailedPath(oldP), this.fromJailedPath(newP));
    }
    renameSync(oldP, newP) {
        return this.baseFs.renameSync(this.fromJailedPath(oldP), this.fromJailedPath(newP));
    }
    async copyFilePromise(sourceP, destP, flags) {
        return await this.baseFs.copyFilePromise(this.fromJailedPath(sourceP), this.fromJailedPath(destP), flags);
    }
    copyFileSync(sourceP, destP, flags) {
        return this.baseFs.copyFileSync(this.fromJailedPath(sourceP), this.fromJailedPath(destP), flags);
    }
    async writeFilePromise(p, content, opts) {
        return await this.baseFs.writeFilePromise(this.fromJailedPath(p), content, opts);
    }
    writeFileSync(p, content, opts) {
        return this.baseFs.writeFileSync(this.fromJailedPath(p), content, opts);
    }
    async unlinkPromise(p) {
        return await this.baseFs.rmdirPromise(this.fromJailedPath(p));
    }
    unlinkSync(p) {
        return this.baseFs.rmdirSync(this.fromJailedPath(p));
    }
    async utimesPromise(p, atime, mtime) {
        return await this.baseFs.utimesPromise(this.fromJailedPath(p), atime, mtime);
    }
    utimesSync(p, atime, mtime) {
        return this.baseFs.utimesSync(this.fromJailedPath(p), atime, mtime);
    }
    async mkdirPromise(p) {
        return await this.baseFs.mkdirPromise(this.fromJailedPath(p));
    }
    mkdirSync(p) {
        return this.baseFs.mkdirSync(this.fromJailedPath(p));
    }
    async rmdirPromise(p) {
        return await this.baseFs.rmdirPromise(this.fromJailedPath(p));
    }
    rmdirSync(p) {
        return this.baseFs.rmdirSync(this.fromJailedPath(p));
    }
    async symlinkPromise(target, p) {
        return await this.baseFs.symlinkPromise(target, this.fromJailedPath(p));
    }
    symlinkSync(target, p) {
        return this.baseFs.symlinkSync(target, this.fromJailedPath(p));
    }
    async readFilePromise(p, encoding) {
        // This weird switch is required to tell TypeScript that the signatures are proper (otherwise it thinks that only the generic one is covered)
        switch (encoding) {
            case `utf8`:
                return await this.baseFs.readFilePromise(this.fromJailedPath(p), encoding);
            default:
                return await this.baseFs.readFilePromise(this.fromJailedPath(p), encoding);
        }
    }
    readFileSync(p, encoding) {
        // This weird switch is required to tell TypeScript that the signatures are proper (otherwise it thinks that only the generic one is covered)
        switch (encoding) {
            case `utf8`:
                return this.baseFs.readFileSync(this.fromJailedPath(p), encoding);
            default:
                return this.baseFs.readFileSync(this.fromJailedPath(p), encoding);
        }
    }
    async readdirPromise(p) {
        return await this.baseFs.readdirPromise(this.fromJailedPath(p));
    }
    readdirSync(p) {
        return this.baseFs.readdirSync(this.fromJailedPath(p));
    }
    async readlinkPromise(p) {
        return await this.baseFs.readlinkPromise(this.fromJailedPath(p));
    }
    readlinkSync(p) {
        return this.baseFs.readlinkSync(this.fromJailedPath(p));
    }
    fromJailedPath(p) {
        const normalized = path_1.posix.normalize(p);
        if (path_1.posix.isAbsolute(p))
            return path_1.posix.resolve(this.target, path_1.posix.relative(`/`, p));
        if (normalized.match(/^\.\.\//))
            throw new Error(`Resolving this path (${p}) would escape the jail`);
        return path_1.posix.resolve(this.target, p);
    }
    toJailedPath(p) {
        return path_1.posix.resolve(`/`, path_1.posix.relative(this.target, p));
    }
}
exports.JailFS = JailFS;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const libzip_1 = __importDefault(__webpack_require__(13));
const fs_1 = __webpack_require__(7);
const path_1 = __webpack_require__(2);
const stream_1 = __webpack_require__(16);
const util_1 = __webpack_require__(17);
const FakeFS_1 = __webpack_require__(8);
const NodeFS_1 = __webpack_require__(6);
const S_IFMT = 0o170000;
const S_IFDIR = 0o040000;
const S_IFREG = 0o100000;
const S_IFLNK = 0o120000;
class StatEntry {
    constructor() {
        this.dev = 0;
        this.ino = 0;
        this.mode = 0;
        this.nlink = 1;
        this.rdev = 0;
        this.blocks = 1;
    }
    isBlockDevice() {
        return false;
    }
    isCharacterDevice() {
        return false;
    }
    isDirectory() {
        return (this.mode & S_IFMT) === S_IFDIR;
    }
    isFIFO() {
        return false;
    }
    isFile() {
        return (this.mode & S_IFMT) === S_IFREG;
    }
    isSocket() {
        return false;
    }
    isSymbolicLink() {
        return (this.mode & S_IFMT) === S_IFLNK;
    }
}
function toUnixTimestamp(time) {
    if (typeof time === 'string' && String(+time) === time) {
        return +time;
    }
    // @ts-ignore
    if (Number.isFinite(time)) {
        if (time < 0) {
            return Date.now() / 1000;
        }
        else {
            return time;
        }
    }
    if (util_1.isDate(time)) {
        // convert to 123.456 UNIX timestamp
        // @ts-ignore
        return time.getTime() / 1000;
    }
    throw new Error(`Invalid time`);
}
class ZipFS extends FakeFS_1.FakeFS {
    constructor(p, { baseFs = new NodeFS_1.NodeFS(), create = false, readOnly = false, stats } = {}) {
        super();
        this.listings = new Map();
        this.entries = new Map();
        this.ready = false;
        this.path = p;
        this.baseFs = baseFs;
        if (stats) {
            this.stats = stats;
        }
        else {
            try {
                this.stats = this.baseFs.statSync(p);
            }
            catch (error) {
                if (error.code === `ENOENT` && create) {
                    this.stats = Object.assign(new StatEntry(), { uid: 0, gid: 0, size: 0, blksize: 0, atimeMs: 0, mtimeMs: 0, ctimeMs: 0, birthtimeMs: 0, atime: new Date(0), mtime: new Date(0), ctime: new Date(0), birthtime: new Date(0), mode: S_IFREG | 0o644 });
                }
                else {
                    throw error;
                }
            }
        }
        const errPtr = libzip_1.default.malloc(4);
        try {
            let flags = 0;
            if (create)
                flags |= libzip_1.default.ZIP_CREATE | libzip_1.default.ZIP_TRUNCATE;
            if (readOnly)
                flags |= libzip_1.default.ZIP_RDONLY;
            this.zip = libzip_1.default.open(p, flags, errPtr);
            if (this.zip === 0) {
                const error = libzip_1.default.struct.errorS();
                libzip_1.default.error.initWithCode(error, libzip_1.default.getValue(errPtr, `i32`));
                throw new Error(libzip_1.default.error.strerror(error));
            }
        }
        finally {
            libzip_1.default.free(errPtr);
        }
        const entryCount = libzip_1.default.getNumEntries(this.zip, 0);
        this.listings.set(`/`, new Set());
        for (let t = 0; t < entryCount; ++t) {
            const raw = libzip_1.default.getName(this.zip, t, 0);
            if (path_1.posix.isAbsolute(raw))
                continue;
            const p = path_1.posix.resolve(`/`, raw);
            this.registerEntry(p, t);
        }
        this.ready = true;
    }
    getRealPath() {
        return this.path;
    }
    saveAndClose() {
        if (!this.ready)
            throw Object.assign(new Error(`EBUSY: archive closed, close`), { code: `EBUSY` });
        const previousMod = this.baseFs.existsSync(this.path)
            ? this.baseFs.statSync(this.path).mode & 0o777
            : null;
        const rc = libzip_1.default.close(this.zip);
        if (rc === -1)
            throw new Error(libzip_1.default.error.strerror(libzip_1.default.getError(this.zip)));
        // Libzip overrides the chmod when writing the archive, which is a weird
        // behavior I don't totally understand (plus the umask seems bogus in some
        // weird cases - maybe related to emscripten?)
        //
        // See also https://github.com/nih-at/libzip/issues/77
        if (previousMod !== null && previousMod !== (this.baseFs.statSync(this.path).mode & 0o777))
            this.baseFs.chmodSync(this.path, previousMod);
        this.ready = false;
    }
    discardAndClose() {
        libzip_1.default.discard(this.zip);
        this.ready = false;
    }
    async openPromise(p, flags, mode) {
        return this.openSync(p, flags, mode);
    }
    openSync(p, flags, mode) {
        throw new Error(`Unimplemented`);
    }
    async closePromise(fd) {
        this.closeSync(fd);
    }
    closeSync(fd) {
        throw new Error(`Unimplemented`);
    }
    createReadStream(p, { encoding } = {}) {
        const stream = Object.assign(new stream_1.PassThrough(), {
            bytesRead: 0,
            path: p,
            close: () => {
                clearImmediate(immediate);
            }
        });
        const immediate = setImmediate(() => {
            try {
                const data = this.readFileSync(p, encoding);
                stream.bytesRead = data.length;
                stream.write(data);
                stream.end();
            }
            catch (error) {
                stream.emit(`error`, error);
                stream.end();
            }
        });
        return stream;
    }
    createWriteStream(p, { encoding } = {}) {
        const stream = Object.assign(new stream_1.PassThrough(), {
            bytesWritten: 0,
            path: p,
            close: () => {
                stream.end();
            },
        });
        const chunks = [];
        stream.on(`data`, chunk => {
            const chunkBuffer = Buffer.from(chunk);
            stream.bytesWritten += chunkBuffer.length;
            chunks.push(chunkBuffer);
        });
        stream.on(`end`, () => {
            this.writeFileSync(p, Buffer.concat(chunks), encoding);
        });
        return stream;
    }
    async realpathPromise(p) {
        return this.realpathSync(p);
    }
    realpathSync(p) {
        const resolvedP = this.resolveFilename(`lstat '${p}'`, p);
        if (!this.entries.has(resolvedP) && !this.listings.has(resolvedP))
            throw Object.assign(new Error(`ENOENT: no such file or directory, lstat '${p}'`), { code: `ENOENT` });
        return resolvedP;
    }
    async existsPromise(p) {
        return this.existsSync(p);
    }
    existsSync(p) {
        let resolvedP;
        try {
            resolvedP = this.resolveFilename(`stat '${p}'`, p);
        }
        catch (error) {
            return false;
        }
        return this.entries.has(resolvedP) || this.listings.has(resolvedP);
    }
    async statPromise(p) {
        return this.statSync(p);
    }
    statSync(p) {
        const resolvedP = this.resolveFilename(`stat '${p}'`, p);
        if (!this.entries.has(resolvedP) && !this.listings.has(resolvedP))
            throw Object.assign(new Error(`ENOENT: no such file or directory, stat '${p}'`), { code: `ENOENT` });
        if (p[p.length - 1] === `/` && !this.listings.has(resolvedP))
            throw Object.assign(new Error(`ENOTDIR: not a directory, stat '${p}'`), { code: `ENOTDIR` });
        return this.statImpl(`stat '${p}'`, resolvedP);
    }
    async lstatPromise(p) {
        return this.lstatSync(p);
    }
    lstatSync(p) {
        const resolvedP = this.resolveFilename(`lstat '${p}'`, p, false);
        if (!this.entries.has(resolvedP) && !this.listings.has(resolvedP))
            throw Object.assign(new Error(`ENOENT: no such file or directory, lstat '${p}'`), { code: `ENOENT` });
        if (p[p.length - 1] === `/` && !this.listings.has(resolvedP))
            throw Object.assign(new Error(`ENOTDIR: not a directory, lstat '${p}'`), { code: `ENOTDIR` });
        return this.statImpl(`lstat '${p}'`, resolvedP);
    }
    statImpl(reason, p) {
        if (this.listings.has(p)) {
            const uid = this.stats.uid;
            const gid = this.stats.gid;
            const size = 0;
            const blksize = 512;
            const blocks = 0;
            const atimeMs = this.stats.mtimeMs;
            const birthtimeMs = this.stats.mtimeMs;
            const ctimeMs = this.stats.mtimeMs;
            const mtimeMs = this.stats.mtimeMs;
            const atime = new Date(atimeMs);
            const birthtime = new Date(birthtimeMs);
            const ctime = new Date(ctimeMs);
            const mtime = new Date(mtimeMs);
            const mode = S_IFDIR | 0o755;
            return Object.assign(new StatEntry(), { uid, gid, size, blksize, blocks, atime, birthtime, ctime, mtime, atimeMs, birthtimeMs, ctimeMs, mtimeMs, mode });
        }
        const entry = this.entries.get(p);
        if (entry !== undefined) {
            const stat = libzip_1.default.struct.statS();
            const rc = libzip_1.default.statIndex(this.zip, entry, 0, 0, stat);
            if (rc === -1)
                throw new Error(libzip_1.default.error.strerror(libzip_1.default.getError(this.zip)));
            const uid = this.stats.uid;
            const gid = this.stats.gid;
            const size = (libzip_1.default.struct.statSize(stat) >>> 0);
            const blksize = 512;
            const blocks = Math.ceil(size / blksize);
            const mtimeMs = (libzip_1.default.struct.statMtime(stat) >>> 0) * 1000;
            const atimeMs = mtimeMs;
            const birthtimeMs = mtimeMs;
            const ctimeMs = mtimeMs;
            const atime = new Date(atimeMs);
            const birthtime = new Date(birthtimeMs);
            const ctime = new Date(ctimeMs);
            const mtime = new Date(mtimeMs);
            const mode = this.getUnixMode(entry, S_IFREG | 0o644);
            return Object.assign(new StatEntry(), { uid, gid, size, blksize, blocks, atime, birthtime, ctime, mtime, atimeMs, birthtimeMs, ctimeMs, mtimeMs, mode });
        }
        throw new Error(`Unreachable`);
    }
    getUnixMode(index, defaultMode) {
        const rc = libzip_1.default.file.getExternalAttributes(this.zip, index, 0, 0, libzip_1.default.uint08S, libzip_1.default.uint32S);
        if (rc === -1)
            throw new Error(libzip_1.default.error.strerror(libzip_1.default.getError(this.zip)));
        const opsys = libzip_1.default.getValue(libzip_1.default.uint08S, `i8`) >>> 0;
        if (opsys !== libzip_1.default.ZIP_OPSYS_UNIX)
            return defaultMode;
        return libzip_1.default.getValue(libzip_1.default.uint32S, `i32`) >>> 16;
    }
    registerListing(p) {
        let listing = this.listings.get(p);
        if (listing)
            return listing;
        const parentListing = this.registerListing(path_1.posix.dirname(p));
        listing = new Set();
        parentListing.add(path_1.posix.basename(p));
        this.listings.set(p, listing);
        return listing;
    }
    registerEntry(p, index) {
        const parentListing = this.registerListing(path_1.posix.dirname(p));
        parentListing.add(path_1.posix.basename(p));
        this.entries.set(p, index);
    }
    resolveFilename(reason, p, resolveLastComponent = true) {
        if (!this.ready)
            throw Object.assign(new Error(`EBUSY: archive closed, ${reason}`), { code: `EBUSY` });
        let resolvedP = path_1.posix.resolve(`/`, p);
        if (resolvedP === `/`)
            return `/`;
        while (true) {
            const parentP = this.resolveFilename(reason, path_1.posix.dirname(resolvedP), true);
            const isDir = this.listings.has(parentP);
            const doesExist = this.entries.has(parentP);
            if (!isDir && !doesExist)
                throw Object.assign(new Error(`ENOENT: no such file or directory, ${reason}`), { code: `ENOENT` });
            if (!isDir)
                throw Object.assign(new Error(`ENOTDIR: not a directory, ${reason}`), { code: `ENOTDIR` });
            resolvedP = path_1.posix.resolve(parentP, path_1.posix.basename(resolvedP));
            if (!resolveLastComponent)
                break;
            const index = libzip_1.default.name.locate(this.zip, resolvedP);
            if (index === -1)
                break;
            if (this.isSymbolicLink(index)) {
                const target = this.getFileSource(index).toString();
                resolvedP = path_1.posix.resolve(path_1.posix.dirname(resolvedP), target);
            }
            else {
                break;
            }
        }
        return resolvedP;
    }
    setFileSource(p, content) {
        if (!Buffer.isBuffer(content))
            content = Buffer.from(content);
        const buffer = libzip_1.default.malloc(content.byteLength);
        if (!buffer)
            throw new Error(`Couldn't allocate enough memory`);
        // Copy the file into the Emscripten heap
        const heap = new Uint8Array(libzip_1.default.HEAPU8.buffer, buffer, content.byteLength);
        heap.set(content);
        const source = libzip_1.default.source.fromBuffer(this.zip, buffer, content.byteLength, 0, true);
        if (source === 0) {
            libzip_1.default.free(buffer);
            throw new Error(libzip_1.default.error.strerror(libzip_1.default.getError(this.zip)));
        }
        return libzip_1.default.file.add(this.zip, path_1.posix.relative(`/`, p), source, libzip_1.default.ZIP_FL_OVERWRITE);
    }
    isSymbolicLink(index) {
        const attrs = libzip_1.default.file.getExternalAttributes(this.zip, index, 0, 0, libzip_1.default.uint08S, libzip_1.default.uint32S);
        if (attrs === -1)
            throw new Error(libzip_1.default.error.strerror(libzip_1.default.getError(this.zip)));
        const opsys = libzip_1.default.getValue(libzip_1.default.uint08S, `i8`) >>> 0;
        if (opsys !== libzip_1.default.ZIP_OPSYS_UNIX)
            return false;
        const attributes = libzip_1.default.getValue(libzip_1.default.uint32S, `i32`) >>> 16;
        return (attributes & S_IFMT) === S_IFLNK;
    }
    getFileSource(index) {
        const stat = libzip_1.default.struct.statS();
        const rc = libzip_1.default.statIndex(this.zip, index, 0, 0, stat);
        if (rc === -1)
            throw new Error(libzip_1.default.error.strerror(libzip_1.default.getError(this.zip)));
        const size = libzip_1.default.struct.statSize(stat);
        const buffer = libzip_1.default.malloc(size);
        try {
            const file = libzip_1.default.fopenIndex(this.zip, index, 0, 0);
            if (file === 0)
                throw new Error(libzip_1.default.error.strerror(libzip_1.default.getError(this.zip)));
            try {
                const rc = libzip_1.default.fread(file, buffer, size, 0);
                if (rc === -1)
                    throw new Error(libzip_1.default.error.strerror(libzip_1.default.file.getError(file)));
                else if (rc < size)
                    throw new Error(`Incomplete read`);
                else if (rc > size)
                    throw new Error(`Overread`);
                const memory = libzip_1.default.HEAPU8.subarray(buffer, buffer + size);
                const data = Buffer.from(memory);
                return data;
            }
            finally {
                libzip_1.default.fclose(file);
            }
        }
        finally {
            libzip_1.default.free(buffer);
        }
    }
    async chmodPromise(p, mask) {
        return this.chmodSync(p, mask);
    }
    chmodSync(p, mask) {
        const resolvedP = this.resolveFilename(`chmod '${p}'`, p, false);
        if (this.listings.has(resolvedP)) {
            if ((mask & 0o755) === 0o755) {
                return;
            }
            else {
                throw Object.assign(new Error(`EISDIR: illegal operation on a directory, chmod '${p}'`), { code: `EISDIR` });
            }
        }
        const entry = this.entries.get(resolvedP);
        if (entry === undefined)
            throw new Error(`Unreachable`);
        const oldMod = this.getUnixMode(entry, S_IFREG | 0o000);
        const newMod = oldMod & (~0o777) | mask;
        const rc = libzip_1.default.file.setExternalAttributes(this.zip, entry, 0, 0, libzip_1.default.ZIP_OPSYS_UNIX, newMod << 16);
        if (rc === -1) {
            throw new Error(libzip_1.default.error.strerror(libzip_1.default.getError(this.zip)));
        }
    }
    async renamePromise(oldP, newP) {
        return this.renameSync(oldP, newP);
    }
    renameSync(oldP, newP) {
        throw new Error(`Unimplemented`);
    }
    async copyFilePromise(sourceP, destP, flags) {
        return this.copyFileSync(sourceP, destP, flags);
    }
    copyFileSync(sourceP, destP, flags = 0) {
        if ((flags & fs_1.constants.COPYFILE_FICLONE_FORCE) !== 0)
            throw Object.assign(new Error(`ENOSYS: unsupported clone operation, copyfile '${sourceP}' -> ${destP}'`), { code: `ENOSYS` });
        const resolvedSourceP = this.resolveFilename(`copyfile '${sourceP} -> ${destP}'`, sourceP);
        const indexSource = this.entries.get(resolvedSourceP);
        if (typeof indexSource === `undefined`)
            throw Object.assign(new Error(`EINVAL: invalid argument, copyfile '${sourceP}' -> '${destP}'`), { code: `EINVAL` });
        const resolvedDestP = this.resolveFilename(`copyfile '${sourceP}' -> ${destP}'`, destP);
        const indexDest = this.entries.get(resolvedDestP);
        if ((flags & (fs_1.constants.COPYFILE_EXCL | fs_1.constants.COPYFILE_FICLONE_FORCE)) !== 0 && typeof indexDest !== `undefined`)
            throw Object.assign(new Error(`EEXIST: file already exists, copyfile '${sourceP}' -> '${destP}'`), { code: `EEXIST` });
        const source = this.getFileSource(indexSource);
        const newIndex = this.setFileSource(resolvedDestP, source);
        if (newIndex !== indexDest) {
            this.registerEntry(resolvedDestP, newIndex);
        }
    }
    async writeFilePromise(p, content, opts) {
        return this.writeFileSync(p, content, opts);
    }
    writeFileSync(p, content, opts) {
        const resolvedP = this.resolveFilename(`open '${p}'`, p);
        if (this.listings.has(resolvedP))
            throw Object.assign(new Error(`EISDIR: illegal operation on a directory, open '${p}'`), { code: `EISDIR` });
        const index = this.entries.get(resolvedP);
        if (index !== undefined && typeof opts === `object` && opts.flag && opts.flag.includes(`a`))
            content = Buffer.concat([this.getFileSource(index), Buffer.from(content)]);
        let encoding = null;
        if (typeof opts === `string`)
            encoding = opts;
        else if (typeof opts === `object` && opts.encoding)
            encoding = opts.encoding;
        if (encoding !== null)
            content = content.toString(encoding);
        const newIndex = this.setFileSource(resolvedP, content);
        if (newIndex !== index) {
            this.registerEntry(resolvedP, newIndex);
        }
    }
    async unlinkPromise(p) {
        return this.unlinkSync(p);
    }
    unlinkSync(p) {
        throw new Error(`Unimplemented`);
    }
    async utimesPromise(p, atime, mtime) {
        return this.utimesSync(p, atime, mtime);
    }
    utimesSync(p, atime, mtime) {
        const resolvedP = this.resolveFilename(`chmod '${p}'`, p);
        return this.utimesImpl(resolvedP, mtime);
    }
    async lutimesPromise(p, atime, mtime) {
        return this.lutimesSync(p, atime, mtime);
    }
    lutimesSync(p, atime, mtime) {
        const resolvedP = this.resolveFilename(`chmod '${p}'`, p, false);
        return this.utimesImpl(resolvedP, mtime);
    }
    utimesImpl(resolvedP, mtime) {
        if (this.listings.has(resolvedP))
            if (!this.entries.has(resolvedP))
                this.hydrateDirectory(resolvedP);
        const entry = this.entries.get(resolvedP);
        if (entry === undefined)
            throw new Error(`Unreachable`);
        const rc = libzip_1.default.file.setMtime(this.zip, entry, 0, toUnixTimestamp(mtime), 0);
        if (rc === -1) {
            throw new Error(libzip_1.default.error.strerror(libzip_1.default.getError(this.zip)));
        }
    }
    async mkdirPromise(p) {
        return this.mkdirSync(p);
    }
    mkdirSync(p) {
        const resolvedP = this.resolveFilename(`mkdir '${p}'`, p);
        if (this.entries.has(resolvedP) || this.listings.has(resolvedP))
            throw Object.assign(new Error(`EEXIST: file already exists, mkdir '${p}'`), { code: `EEXIST` });
        this.hydrateDirectory(resolvedP);
    }
    async rmdirPromise(p) {
        return this.rmdirSync(p);
    }
    rmdirSync(p) {
        throw new Error(`Unimplemented`);
    }
    hydrateDirectory(resolvedP) {
        const index = libzip_1.default.dir.add(this.zip, path_1.posix.relative(`/`, resolvedP));
        if (index === -1)
            throw new Error(libzip_1.default.error.strerror(libzip_1.default.getError(this.zip)));
        this.registerListing(resolvedP);
        this.registerEntry(resolvedP, index);
        return index;
    }
    async symlinkPromise(target, p) {
        return this.symlinkSync(target, p);
    }
    symlinkSync(target, p) {
        const resolvedP = this.resolveFilename(`symlink '${target}' -> '${p}'`, p);
        if (this.listings.has(resolvedP))
            throw Object.assign(new Error(`EISDIR: illegal operation on a directory, symlink '${target}' -> '${p}'`), { code: `EISDIR` });
        if (this.entries.has(resolvedP))
            throw Object.assign(new Error(`EEXIST: file already exists, symlink '${target}' -> '${p}'`), { code: `EEXIST` });
        const index = this.setFileSource(resolvedP, target);
        this.registerEntry(resolvedP, index);
        const rc = libzip_1.default.file.setExternalAttributes(this.zip, index, 0, 0, libzip_1.default.ZIP_OPSYS_UNIX, (0o120000 | 0o777) << 16);
        if (rc === -1) {
            throw new Error(libzip_1.default.error.strerror(libzip_1.default.getError(this.zip)));
        }
    }
    async readFilePromise(p, encoding) {
        // This weird switch is required to tell TypeScript that the signatures are proper (otherwise it thinks that only the generic one is covered)
        switch (encoding) {
            case `utf8`:
                return this.readFileSync(p, encoding);
            default:
                return this.readFileSync(p, encoding);
        }
    }
    readFileSync(p, encoding) {
        // This is messed up regarding the TS signatures
        if (typeof encoding === `object`)
            // @ts-ignore
            encoding = encoding ? encoding.encoding : undefined;
        const resolvedP = this.resolveFilename(`open '${p}'`, p);
        if (!this.entries.has(resolvedP) && !this.listings.has(resolvedP))
            throw Object.assign(new Error(`ENOENT: no such file or directory, open '${p}'`), { code: `ENOENT` });
        // Ensures that the last component is a directory, if the user said so (even if it is we'll throw right after with EISDIR anyway)
        if (p[p.length - 1] === `/` && !this.listings.has(resolvedP))
            throw Object.assign(new Error(`ENOTDIR: not a directory, open '${p}'`), { code: `ENOTDIR` });
        if (this.listings.has(resolvedP))
            throw Object.assign(new Error(`EISDIR: illegal operation on a directory, read`), { code: `EISDIR` });
        const entry = this.entries.get(resolvedP);
        if (entry === undefined)
            throw new Error(`Unreachable`);
        const data = this.getFileSource(entry);
        return encoding ? data.toString(encoding) : data;
    }
    async readdirPromise(p) {
        return this.readdirSync(p);
    }
    readdirSync(p) {
        const resolvedP = this.resolveFilename(`scandir '${p}'`, p);
        if (!this.entries.has(resolvedP) && !this.listings.has(resolvedP))
            throw Object.assign(new Error(`ENOENT: no such file or directory, scandir '${p}'`), { code: `ENOENT` });
        const directoryListing = this.listings.get(resolvedP);
        if (!directoryListing)
            throw Object.assign(new Error(`ENOTDIR: not a directory, scandir '${p}'`), { code: `ENOTDIR` });
        return Array.from(directoryListing);
    }
    async readlinkPromise(p) {
        return this.readlinkSync(p);
    }
    readlinkSync(p) {
        const resolvedP = this.resolveFilename(`readlink '${p}'`, p, false);
        if (!this.entries.has(resolvedP) && !this.listings.has(resolvedP))
            throw Object.assign(new Error(`ENOENT: no such file or directory, readlink '${p}'`), { code: `ENOENT` });
        // Ensure that the last component is a directory (if it is we'll throw right after with EISDIR anyway)
        if (p[p.length - 1] === `/` && !this.listings.has(resolvedP))
            throw Object.assign(new Error(`ENOTDIR: not a directory, open '${p}'`), { code: `ENOTDIR` });
        if (this.listings.has(resolvedP))
            throw Object.assign(new Error(`EINVAL: invalid argument, readlink '${p}'`), { code: `EINVAL` });
        const entry = this.entries.get(resolvedP);
        if (entry === undefined)
            throw new Error(`Unreachable`);
        const rc = libzip_1.default.file.getExternalAttributes(this.zip, entry, 0, 0, libzip_1.default.uint08S, libzip_1.default.uint32S);
        if (rc === -1)
            throw new Error(libzip_1.default.error.strerror(libzip_1.default.getError(this.zip)));
        const opsys = libzip_1.default.getValue(libzip_1.default.uint08S, `i8`) >>> 0;
        if (opsys !== libzip_1.default.ZIP_OPSYS_UNIX)
            throw Object.assign(new Error(`EINVAL: invalid argument, readlink '${p}'`), { code: `EINVAL` });
        const attributes = libzip_1.default.getValue(libzip_1.default.uint32S, `i32`) >>> 16;
        if ((attributes & 0o170000) !== 0o120000)
            throw Object.assign(new Error(`EINVAL: invalid argument, readlink '${p}'`), { code: `EINVAL` });
        return this.getFileSource(entry).toString();
    }
}
exports.ZipFS = ZipFS;
;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const libzip_1 = __importDefault(__webpack_require__(14));
const number64 = [
    `number`,
    `number`,
];
exports.default = {
    // Those are getters because they can change after memory growth
    get HEAP8() { return libzip_1.default.HEAP8; },
    get HEAPU8() { return libzip_1.default.HEAPU8; },
    ZIP_CHECKCONS: 4,
    ZIP_CREATE: 1,
    ZIP_EXCL: 2,
    ZIP_TRUNCATE: 8,
    ZIP_RDONLY: 16,
    ZIP_FL_OVERWRITE: 8192,
    ZIP_OPSYS_DOS: 0x00,
    ZIP_OPSYS_AMIGA: 0x01,
    ZIP_OPSYS_OPENVMS: 0x02,
    ZIP_OPSYS_UNIX: 0x03,
    ZIP_OPSYS_VM_CMS: 0x04,
    ZIP_OPSYS_ATARI_ST: 0x05,
    ZIP_OPSYS_OS_2: 0x06,
    ZIP_OPSYS_MACINTOSH: 0x07,
    ZIP_OPSYS_Z_SYSTEM: 0x08,
    ZIP_OPSYS_CPM: 0x09,
    ZIP_OPSYS_WINDOWS_NTFS: 0x0a,
    ZIP_OPSYS_MVS: 0x0b,
    ZIP_OPSYS_VSE: 0x0c,
    ZIP_OPSYS_ACORN_RISC: 0x0d,
    ZIP_OPSYS_VFAT: 0x0e,
    ZIP_OPSYS_ALTERNATE_MVS: 0x0f,
    ZIP_OPSYS_BEOS: 0x10,
    ZIP_OPSYS_TANDEM: 0x11,
    ZIP_OPSYS_OS_400: 0x12,
    ZIP_OPSYS_OS_X: 0x13,
    uint08S: libzip_1.default._malloc(1),
    uint16S: libzip_1.default._malloc(2),
    uint32S: libzip_1.default._malloc(4),
    uint64S: libzip_1.default._malloc(8),
    malloc: libzip_1.default._malloc,
    free: libzip_1.default._free,
    getValue: libzip_1.default.getValue,
    open: libzip_1.default.cwrap(`zip_open`, `number`, [`string`, `number`, `number`]),
    close: libzip_1.default.cwrap(`zip_close`, `number`, [`number`]),
    discard: libzip_1.default.cwrap(`zip_discard`, `void`, [`number`]),
    getError: libzip_1.default.cwrap(`zip_get_error`, `number`, [`number`]),
    getName: libzip_1.default.cwrap(`zip_get_name`, `string`, [`number`, `number`, `number`]),
    getNumEntries: libzip_1.default.cwrap(`zip_get_num_entries`, `number`, [`number`, `number`]),
    stat: libzip_1.default.cwrap(`zip_stat`, `number`, [`number`, `string`, `number`, `number`]),
    statIndex: libzip_1.default.cwrap(`zip_stat_index`, `number`, [`number`, ...number64, `number`, `number`]),
    fopen: libzip_1.default.cwrap(`zip_fopen`, `number`, [`number`, `string`, `number`]),
    fopenIndex: libzip_1.default.cwrap(`zip_fopen_index`, `number`, [`number`, ...number64, `number`]),
    fread: libzip_1.default.cwrap(`zip_fread`, `number`, [`number`, `number`, `number`, `number`]),
    fclose: libzip_1.default.cwrap(`zip_fclose`, `number`, [`number`]),
    dir: {
        add: libzip_1.default.cwrap(`zip_dir_add`, `number`, [`number`, `string`]),
    },
    file: {
        add: libzip_1.default.cwrap(`zip_file_add`, `number`, [`number`, `string`, `number`, `number`]),
        getError: libzip_1.default.cwrap(`zip_file_get_error`, `number`, [`number`]),
        getExternalAttributes: libzip_1.default.cwrap(`zip_file_get_external_attributes`, `number`, [`number`, ...number64, `number`, `number`, `number`]),
        setExternalAttributes: libzip_1.default.cwrap(`zip_file_set_external_attributes`, `number`, [`number`, ...number64, `number`, `number`, `number`]),
        setMtime: libzip_1.default.cwrap(`zip_file_set_mtime`, `number`, [`number`, ...number64, `number`, `number`]),
    },
    error: {
        initWithCode: libzip_1.default.cwrap(`zip_error_init_with_code`, `void`, [`number`, `number`]),
        strerror: libzip_1.default.cwrap(`zip_error_strerror`, `string`, [`number`]),
    },
    name: {
        locate: libzip_1.default.cwrap(`zip_name_locate`, `number`, [`number`, `string`, `number`]),
    },
    source: {
        fromBuffer: libzip_1.default.cwrap(`zip_source_buffer`, `number`, [`number`, `number`, ...number64, `number`]),
    },
    struct: {
        stat: libzip_1.default.cwrap(`zipstruct_stat`, `number`, []),
        statS: libzip_1.default.cwrap(`zipstruct_statS`, `number`, []),
        statName: libzip_1.default.cwrap(`zipstruct_stat_name`, `string`, [`number`]),
        statIndex: libzip_1.default.cwrap(`zipstruct_stat_index`, `number`, [`number`]),
        statSize: libzip_1.default.cwrap(`zipstruct_stat_size`, `number`, [`number`]),
        statMtime: libzip_1.default.cwrap(`zipstruct_stat_mtime`, `number`, [`number`]),
        error: libzip_1.default.cwrap(`zipstruct_error`, `number`, []),
        errorS: libzip_1.default.cwrap(`zipstruct_errorS`, `number`, []),
    },
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var frozenFs = Object.assign({}, __webpack_require__(7));
var Module=typeof Module!=="undefined"?Module:{};var moduleOverrides={};var key;for(key in Module){if(Module.hasOwnProperty(key)){moduleOverrides[key]=Module[key]}}Module["arguments"]=[];Module["thisProgram"]="./this.program";Module["quit"]=(function(status,toThrow){throw toThrow});Module["preRun"]=[];Module["postRun"]=[];var ENVIRONMENT_IS_WEB=false;var ENVIRONMENT_IS_WORKER=false;var ENVIRONMENT_IS_NODE=true;if(Module["ENVIRONMENT"]){throw new Error("Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -s ENVIRONMENT=web or -s ENVIRONMENT=node)")}var scriptDirectory="";function locateFile(path){if(Module["locateFile"]){return Module["locateFile"](path,scriptDirectory)}else{return scriptDirectory+path}}if(ENVIRONMENT_IS_NODE){if(!(typeof process==="object"&&"function"==="function"))throw new Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)");scriptDirectory=__dirname+"/";var nodeFS;var nodePath;Module["read"]=function shell_read(filename,binary){var ret;ret=tryParseAsDataURI(filename);if(!ret){if(!nodeFS)nodeFS=frozenFs;if(!nodePath)nodePath=__webpack_require__(2);filename=nodePath["normalize"](filename);ret=nodeFS["readFileSync"](filename)}return binary?ret:ret.toString()};Module["readBinary"]=function readBinary(filename){var ret=Module["read"](filename,true);if(!ret.buffer){ret=new Uint8Array(ret)}assert(ret.buffer);return ret};if(process["argv"].length>1){Module["thisProgram"]=process["argv"][1].replace(/\\/g,"/")}Module["arguments"]=process["argv"].slice(2);if(true){module["exports"]=Module}(function(){})("uncaughtException",(function(ex){if(!(ex instanceof ExitStatus)){throw ex}}));(function(){})("unhandledRejection",abort);Module["quit"]=(function(status){process["exit"](status)});Module["inspect"]=(function(){return"[Emscripten Module object]"})}else{throw new Error("environment detection error")}var out=Module["print"]||(typeof console!=="undefined"?console.log.bind(console):typeof print!=="undefined"?print:null);var err=Module["printErr"]||(typeof printErr!=="undefined"?printErr:typeof console!=="undefined"&&console.warn.bind(console)||out);for(key in moduleOverrides){if(moduleOverrides.hasOwnProperty(key)){Module[key]=moduleOverrides[key]}}moduleOverrides=undefined;assert(typeof Module["memoryInitializerPrefixURL"]==="undefined","Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead");assert(typeof Module["pthreadMainPrefixURL"]==="undefined","Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead");assert(typeof Module["cdInitializerPrefixURL"]==="undefined","Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead");assert(typeof Module["filePackagePrefixURL"]==="undefined","Module.filePackagePrefixURL option was removed, use Module.locateFile instead");stackSave=stackRestore=stackAlloc=(function(){abort("cannot use the stack before compiled code is ready to run, and has provided stack access")});function dynamicAlloc(size){assert(DYNAMICTOP_PTR);var ret=HEAP32[DYNAMICTOP_PTR>>2];var end=ret+size+15&-16;HEAP32[DYNAMICTOP_PTR>>2]=end;if(end>=TOTAL_MEMORY){var success=enlargeMemory();if(!success){HEAP32[DYNAMICTOP_PTR>>2]=ret;return 0}}return ret}function getNativeTypeSize(type){switch(type){case"i1":case"i8":return 1;case"i16":return 2;case"i32":return 4;case"i64":return 8;case"float":return 4;case"double":return 8;default:{if(type[type.length-1]==="*"){return 4}else if(type[0]==="i"){var bits=parseInt(type.substr(1));assert(bits%8===0);return bits/8}else{return 0}}}}function warnOnce(text){if(!warnOnce.shown)warnOnce.shown={};if(!warnOnce.shown[text]){warnOnce.shown[text]=1;err(text)}}var asm2wasmImports={"f64-rem":(function(x,y){return x%y}),"debugger":(function(){debugger})};var functionPointers=new Array(0);var tempRet0=0;var setTempRet0=(function(value){tempRet0=value});var GLOBAL_BASE=1024;function getSafeHeapType(bytes,isFloat){switch(bytes){case 1:return"i8";case 2:return"i16";case 4:return isFloat?"float":"i32";case 8:return"double";default:assert(0)}}function SAFE_HEAP_STORE(dest,value,bytes,isFloat){if(dest<=0)abort("segmentation fault storing "+bytes+" bytes to address "+dest);if(dest%bytes!==0)abort("alignment error storing to address "+dest+", which was expected to be aligned to a multiple of "+bytes);if(dest+bytes>HEAP32[DYNAMICTOP_PTR>>2])abort("segmentation fault, exceeded the top of the available dynamic heap when storing "+bytes+" bytes to address "+dest+". DYNAMICTOP="+HEAP32[DYNAMICTOP_PTR>>2]);assert(DYNAMICTOP_PTR);assert(HEAP32[DYNAMICTOP_PTR>>2]<=TOTAL_MEMORY);setValue(dest,value,getSafeHeapType(bytes,isFloat),1)}function SAFE_HEAP_STORE_D(dest,value,bytes){SAFE_HEAP_STORE(dest,value,bytes,true)}function SAFE_HEAP_LOAD(dest,bytes,unsigned,isFloat){if(dest<=0)abort("segmentation fault loading "+bytes+" bytes from address "+dest);if(dest%bytes!==0)abort("alignment error loading from address "+dest+", which was expected to be aligned to a multiple of "+bytes);if(dest+bytes>HEAP32[DYNAMICTOP_PTR>>2])abort("segmentation fault, exceeded the top of the available dynamic heap when loading "+bytes+" bytes from address "+dest+". DYNAMICTOP="+HEAP32[DYNAMICTOP_PTR>>2]);assert(DYNAMICTOP_PTR);assert(HEAP32[DYNAMICTOP_PTR>>2]<=TOTAL_MEMORY);var type=getSafeHeapType(bytes,isFloat);var ret=getValue(dest,type,1);if(unsigned)ret=unSign(ret,parseInt(type.substr(1)),1);return ret}function SAFE_HEAP_LOAD_D(dest,bytes,unsigned){return SAFE_HEAP_LOAD(dest,bytes,unsigned,true)}function segfault(){abort("segmentation fault")}function alignfault(){abort("alignment fault")}var ABORT=false;var EXITSTATUS=0;function assert(condition,text){if(!condition){abort("Assertion failed: "+text)}}function getCFunc(ident){var func=Module["_"+ident];assert(func,"Cannot call unknown function "+ident+", make sure it is exported");return func}var JSfuncs={"stackSave":(function(){stackSave()}),"stackRestore":(function(){stackRestore()}),"arrayToC":(function(arr){var ret=stackAlloc(arr.length);writeArrayToMemory(arr,ret);return ret}),"stringToC":(function(str){var ret=0;if(str!==null&&str!==undefined&&str!==0){var len=(str.length<<2)+1;ret=stackAlloc(len);stringToUTF8(str,ret,len)}return ret})};var toC={"string":JSfuncs["stringToC"],"array":JSfuncs["arrayToC"]};function ccall(ident,returnType,argTypes,args,opts){function convertReturnValue(ret){if(returnType==="string")return Pointer_stringify(ret);if(returnType==="boolean")return Boolean(ret);return ret}var func=getCFunc(ident);var cArgs=[];var stack=0;assert(returnType!=="array",'Return type should not be "array".');if(args){for(var i=0;i<args.length;i++){var converter=toC[argTypes[i]];if(converter){if(stack===0)stack=stackSave();cArgs[i]=converter(args[i])}else{cArgs[i]=args[i]}}}var ret=func.apply(null,cArgs);ret=convertReturnValue(ret);if(stack!==0)stackRestore(stack);return ret}function cwrap(ident,returnType,argTypes,opts){return(function(){return ccall(ident,returnType,argTypes,arguments,opts)})}function setValue(ptr,value,type,noSafe){type=type||"i8";if(type.charAt(type.length-1)==="*")type="i32";if(noSafe){switch(type){case"i1":HEAP8[ptr>>0]=value;break;case"i8":HEAP8[ptr>>0]=value;break;case"i16":HEAP16[ptr>>1]=value;break;case"i32":HEAP32[ptr>>2]=value;break;case"i64":tempI64=[value>>>0,(tempDouble=value,+Math_abs(tempDouble)>=1?tempDouble>0?(Math_min(+Math_floor(tempDouble/4294967296),4294967295)|0)>>>0:~~+Math_ceil((tempDouble- +(~~tempDouble>>>0))/4294967296)>>>0:0)],HEAP32[ptr>>2]=tempI64[0],HEAP32[ptr+4>>2]=tempI64[1];break;case"float":HEAPF32[ptr>>2]=value;break;case"double":HEAPF64[ptr>>3]=value;break;default:abort("invalid type for setValue: "+type)}}else{switch(type){case"i1":SAFE_HEAP_STORE(ptr|0,value|0,1);break;case"i8":SAFE_HEAP_STORE(ptr|0,value|0,1);break;case"i16":SAFE_HEAP_STORE(ptr|0,value|0,2);break;case"i32":SAFE_HEAP_STORE(ptr|0,value|0,4);break;case"i64":tempI64=[value>>>0,(tempDouble=value,+Math_abs(tempDouble)>=1?tempDouble>0?(Math_min(+Math_floor(tempDouble/4294967296),4294967295)|0)>>>0:~~+Math_ceil((tempDouble- +(~~tempDouble>>>0))/4294967296)>>>0:0)],SAFE_HEAP_STORE(ptr|0,tempI64[0]|0,4),SAFE_HEAP_STORE(ptr+4|0,tempI64[1]|0,4);break;case"float":SAFE_HEAP_STORE_D(ptr|0,Math_fround(value),4);break;case"double":SAFE_HEAP_STORE_D(ptr|0,+value,8);break;default:abort("invalid type for setValue: "+type)}}}function getValue(ptr,type,noSafe){type=type||"i8";if(type.charAt(type.length-1)==="*")type="i32";if(noSafe){switch(type){case"i1":return HEAP8[ptr>>0];case"i8":return HEAP8[ptr>>0];case"i16":return HEAP16[ptr>>1];case"i32":return HEAP32[ptr>>2];case"i64":return HEAP32[ptr>>2];case"float":return HEAPF32[ptr>>2];case"double":return HEAPF64[ptr>>3];default:abort("invalid type for getValue: "+type)}}else{switch(type){case"i1":return SAFE_HEAP_LOAD(ptr|0,1,0)|0;case"i8":return SAFE_HEAP_LOAD(ptr|0,1,0)|0;case"i16":return SAFE_HEAP_LOAD(ptr|0,2,0)|0;case"i32":return SAFE_HEAP_LOAD(ptr|0,4,0)|0;case"i64":return SAFE_HEAP_LOAD(ptr|0,8,0)|0;case"float":return Math_fround(SAFE_HEAP_LOAD_D(ptr|0,4,0));case"double":return+SAFE_HEAP_LOAD_D(ptr|0,8,0);default:abort("invalid type for getValue: "+type)}}return null}var ALLOC_NORMAL=0;var ALLOC_NONE=3;function allocate(slab,types,allocator,ptr){var zeroinit,size;if(typeof slab==="number"){zeroinit=true;size=slab}else{zeroinit=false;size=slab.length}var singleType=typeof types==="string"?types:null;var ret;if(allocator==ALLOC_NONE){ret=ptr}else{ret=[_malloc,stackAlloc,dynamicAlloc][allocator](Math.max(size,singleType?1:types.length))}if(zeroinit){var stop;ptr=ret;assert((ret&3)==0);stop=ret+(size&~3);for(;ptr<stop;ptr+=4){HEAP32[ptr>>2]=0}stop=ret+size;while(ptr<stop){HEAP8[ptr++>>0]=0}return ret}if(singleType==="i8"){if(slab.subarray||slab.slice){HEAPU8.set(slab,ret)}else{HEAPU8.set(new Uint8Array(slab),ret)}return ret}var i=0,type,typeSize,previousType;while(i<size){var curr=slab[i];type=singleType||types[i];if(type===0){i++;continue}assert(type,"Must know what type to store in allocate!");if(type=="i64")type="i32";setValue(ret+i,curr,type);if(previousType!==type){typeSize=getNativeTypeSize(type);previousType=type}i+=typeSize}return ret}function getMemory(size){if(!runtimeInitialized)return dynamicAlloc(size);return _malloc(size)}function Pointer_stringify(ptr,length){if(length===0||!ptr)return"";var hasUtf=0;var t;var i=0;while(1){assert(ptr+i<TOTAL_MEMORY);t=SAFE_HEAP_LOAD(ptr+i|0,1,1)|0;hasUtf|=t;if(t==0&&!length)break;i++;if(length&&i==length)break}if(!length)length=i;var ret="";if(hasUtf<128){var MAX_CHUNK=1024;var curr;while(length>0){curr=String.fromCharCode.apply(String,HEAPU8.subarray(ptr,ptr+Math.min(length,MAX_CHUNK)));ret=ret?ret+curr:curr;ptr+=MAX_CHUNK;length-=MAX_CHUNK}return ret}return UTF8ToString(ptr)}var UTF8Decoder=typeof TextDecoder!=="undefined"?new TextDecoder("utf8"):undefined;function UTF8ArrayToString(u8Array,idx){var endPtr=idx;while(u8Array[endPtr])++endPtr;if(endPtr-idx>16&&u8Array.subarray&&UTF8Decoder){return UTF8Decoder.decode(u8Array.subarray(idx,endPtr))}else{var u0,u1,u2,u3,u4,u5;var str="";while(1){u0=u8Array[idx++];if(!u0)return str;if(!(u0&128)){str+=String.fromCharCode(u0);continue}u1=u8Array[idx++]&63;if((u0&224)==192){str+=String.fromCharCode((u0&31)<<6|u1);continue}u2=u8Array[idx++]&63;if((u0&240)==224){u0=(u0&15)<<12|u1<<6|u2}else{u3=u8Array[idx++]&63;if((u0&248)==240){u0=(u0&7)<<18|u1<<12|u2<<6|u3}else{u4=u8Array[idx++]&63;if((u0&252)==248){u0=(u0&3)<<24|u1<<18|u2<<12|u3<<6|u4}else{u5=u8Array[idx++]&63;u0=(u0&1)<<30|u1<<24|u2<<18|u3<<12|u4<<6|u5}}}if(u0<65536){str+=String.fromCharCode(u0)}else{var ch=u0-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}}}}function UTF8ToString(ptr){return UTF8ArrayToString(HEAPU8,ptr)}function stringToUTF8Array(str,outU8Array,outIdx,maxBytesToWrite){if(!(maxBytesToWrite>0))return 0;var startIdx=outIdx;var endIdx=outIdx+maxBytesToWrite-1;for(var i=0;i<str.length;++i){var u=str.charCodeAt(i);if(u>=55296&&u<=57343){var u1=str.charCodeAt(++i);u=65536+((u&1023)<<10)|u1&1023}if(u<=127){if(outIdx>=endIdx)break;outU8Array[outIdx++]=u}else if(u<=2047){if(outIdx+1>=endIdx)break;outU8Array[outIdx++]=192|u>>6;outU8Array[outIdx++]=128|u&63}else if(u<=65535){if(outIdx+2>=endIdx)break;outU8Array[outIdx++]=224|u>>12;outU8Array[outIdx++]=128|u>>6&63;outU8Array[outIdx++]=128|u&63}else if(u<=2097151){if(outIdx+3>=endIdx)break;outU8Array[outIdx++]=240|u>>18;outU8Array[outIdx++]=128|u>>12&63;outU8Array[outIdx++]=128|u>>6&63;outU8Array[outIdx++]=128|u&63}else if(u<=67108863){if(outIdx+4>=endIdx)break;outU8Array[outIdx++]=248|u>>24;outU8Array[outIdx++]=128|u>>18&63;outU8Array[outIdx++]=128|u>>12&63;outU8Array[outIdx++]=128|u>>6&63;outU8Array[outIdx++]=128|u&63}else{if(outIdx+5>=endIdx)break;outU8Array[outIdx++]=252|u>>30;outU8Array[outIdx++]=128|u>>24&63;outU8Array[outIdx++]=128|u>>18&63;outU8Array[outIdx++]=128|u>>12&63;outU8Array[outIdx++]=128|u>>6&63;outU8Array[outIdx++]=128|u&63}}outU8Array[outIdx]=0;return outIdx-startIdx}function stringToUTF8(str,outPtr,maxBytesToWrite){assert(typeof maxBytesToWrite=="number","stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!");return stringToUTF8Array(str,HEAPU8,outPtr,maxBytesToWrite)}function lengthBytesUTF8(str){var len=0;for(var i=0;i<str.length;++i){var u=str.charCodeAt(i);if(u>=55296&&u<=57343)u=65536+((u&1023)<<10)|str.charCodeAt(++i)&1023;if(u<=127){++len}else if(u<=2047){len+=2}else if(u<=65535){len+=3}else if(u<=2097151){len+=4}else if(u<=67108863){len+=5}else{len+=6}}return len}var UTF16Decoder=typeof TextDecoder!=="undefined"?new TextDecoder("utf-16le"):undefined;function demangle(func){warnOnce("warning: build with  -s DEMANGLE_SUPPORT=1  to link in libcxxabi demangling");return func}function demangleAll(text){var regex=/__Z[\w\d_]+/g;return text.replace(regex,(function(x){var y=demangle(x);return x===y?x:y+" ["+x+"]"}))}function jsStackTrace(){var err=new Error;if(!err.stack){try{throw new Error(0)}catch(e){err=e}if(!err.stack){return"(no stack trace available)"}}return err.stack.toString()}function stackTrace(){var js=jsStackTrace();if(Module["extraStackTrace"])js+="\n"+Module["extraStackTrace"]();return demangleAll(js)}var WASM_PAGE_SIZE=65536;var MIN_TOTAL_MEMORY=16777216;function alignUp(x,multiple){if(x%multiple>0){x+=multiple-x%multiple}return x}var buffer,HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;function updateGlobalBuffer(buf){Module["buffer"]=buffer=buf}function updateGlobalBufferViews(){Module["HEAP8"]=HEAP8=new Int8Array(buffer);Module["HEAP16"]=HEAP16=new Int16Array(buffer);Module["HEAP32"]=HEAP32=new Int32Array(buffer);Module["HEAPU8"]=HEAPU8=new Uint8Array(buffer);Module["HEAPU16"]=HEAPU16=new Uint16Array(buffer);Module["HEAPU32"]=HEAPU32=new Uint32Array(buffer);Module["HEAPF32"]=HEAPF32=new Float32Array(buffer);Module["HEAPF64"]=HEAPF64=new Float64Array(buffer)}var STATIC_BASE=1024,STACK_BASE=22720,STACK_MAX=5265600,DYNAMIC_BASE=5265600,DYNAMICTOP_PTR=22464;assert(STACK_BASE%16===0,"stack must start aligned");assert(DYNAMIC_BASE%16===0,"heap must start aligned");function writeStackCookie(){assert((STACK_MAX&3)==0);HEAPU32[(STACK_MAX>>2)-1]=34821223;HEAPU32[(STACK_MAX>>2)-2]=2310721022}function checkStackCookie(){if(HEAPU32[(STACK_MAX>>2)-1]!=34821223||HEAPU32[(STACK_MAX>>2)-2]!=2310721022){abort("Stack overflow! Stack cookie has been overwritten, expected hex dwords 0x89BACDFE and 0x02135467, but received 0x"+HEAPU32[(STACK_MAX>>2)-2].toString(16)+" "+HEAPU32[(STACK_MAX>>2)-1].toString(16))}if(HEAP32[0]!==1668509029)throw"Runtime error: The application has corrupted its heap memory area (address zero)!"}function abortStackOverflow(allocSize){abort("Stack overflow! Attempted to allocate "+allocSize+" bytes on the stack, but stack has only "+(STACK_MAX-stackSave()+allocSize)+" bytes available!")}function abortOnCannotGrowMemory(){abort("Cannot enlarge memory arrays. Either (1) compile with  -s TOTAL_MEMORY=X  with X higher than the current value "+TOTAL_MEMORY+", (2) compile with  -s ALLOW_MEMORY_GROWTH=1  which allows increasing the size at runtime, or (3) if you want malloc to return NULL (0) instead of this abort, compile with  -s ABORTING_MALLOC=0 ")}function enlargeMemory(){assert(HEAP32[DYNAMICTOP_PTR>>2]>TOTAL_MEMORY);var PAGE_MULTIPLE=65536;var LIMIT=2147483648-PAGE_MULTIPLE;if(HEAP32[DYNAMICTOP_PTR>>2]>LIMIT){err("Cannot enlarge memory, asked to go up to "+HEAP32[DYNAMICTOP_PTR>>2]+" bytes, but the limit is "+LIMIT+" bytes!");return false}var OLD_TOTAL_MEMORY=TOTAL_MEMORY;TOTAL_MEMORY=Math.max(TOTAL_MEMORY,MIN_TOTAL_MEMORY);while(TOTAL_MEMORY<HEAP32[DYNAMICTOP_PTR>>2]){if(TOTAL_MEMORY<=536870912){TOTAL_MEMORY=alignUp(2*TOTAL_MEMORY,PAGE_MULTIPLE)}else{TOTAL_MEMORY=Math.min(alignUp((3*TOTAL_MEMORY+2147483648)/4,PAGE_MULTIPLE),LIMIT);if(TOTAL_MEMORY===OLD_TOTAL_MEMORY){warnOnce("Cannot ask for more memory since we reached the practical limit in browsers (which is just below 2GB), so the request would have failed. Requesting only "+TOTAL_MEMORY)}}}var start=Date.now();var replacement=Module["reallocBuffer"](TOTAL_MEMORY);if(!replacement||replacement.byteLength!=TOTAL_MEMORY){err("Failed to grow the heap from "+OLD_TOTAL_MEMORY+" bytes to "+TOTAL_MEMORY+" bytes, not enough memory!");if(replacement){err("Expected to get back a buffer of size "+TOTAL_MEMORY+" bytes, but instead got back a buffer of size "+replacement.byteLength)}TOTAL_MEMORY=OLD_TOTAL_MEMORY;return false}updateGlobalBuffer(replacement);updateGlobalBufferViews();return true}var byteLength;try{byteLength=Function.prototype.call.bind(Object.getOwnPropertyDescriptor(ArrayBuffer.prototype,"byteLength").get);byteLength(new ArrayBuffer(4))}catch(e){byteLength=(function(buffer){return buffer.byteLength})}var TOTAL_STACK=5242880;if(Module["TOTAL_STACK"])assert(TOTAL_STACK===Module["TOTAL_STACK"],"the stack size can no longer be determined at runtime");var TOTAL_MEMORY=Module["TOTAL_MEMORY"]||16777216;if(TOTAL_MEMORY<TOTAL_STACK)err("TOTAL_MEMORY should be larger than TOTAL_STACK, was "+TOTAL_MEMORY+"! (TOTAL_STACK="+TOTAL_STACK+")");assert(typeof Int32Array!=="undefined"&&typeof Float64Array!=="undefined"&&Int32Array.prototype.subarray!==undefined&&Int32Array.prototype.set!==undefined,"JS engine does not provide full typed array support");if(Module["buffer"]){buffer=Module["buffer"];assert(buffer.byteLength===TOTAL_MEMORY,"provided buffer should be "+TOTAL_MEMORY+" bytes, but it is "+buffer.byteLength)}else{if(typeof WebAssembly==="object"&&typeof WebAssembly.Memory==="function"){assert(TOTAL_MEMORY%WASM_PAGE_SIZE===0);Module["wasmMemory"]=new WebAssembly.Memory({"initial":TOTAL_MEMORY/WASM_PAGE_SIZE});buffer=Module["wasmMemory"].buffer}else{buffer=new ArrayBuffer(TOTAL_MEMORY)}assert(buffer.byteLength===TOTAL_MEMORY);Module["buffer"]=buffer}updateGlobalBufferViews();HEAP32[DYNAMICTOP_PTR>>2]=DYNAMIC_BASE;function getTotalMemory(){return TOTAL_MEMORY}HEAP32[0]=1668509029;HEAP16[1]=25459;if(HEAPU8[2]!==115||HEAPU8[3]!==99)throw"Runtime error: expected the system to be little-endian!";function callRuntimeCallbacks(callbacks){while(callbacks.length>0){var callback=callbacks.shift();if(typeof callback=="function"){callback();continue}var func=callback.func;if(typeof func==="number"){if(callback.arg===undefined){Module["dynCall_v"](func)}else{Module["dynCall_vi"](func,callback.arg)}}else{func(callback.arg===undefined?null:callback.arg)}}}var __ATPRERUN__=[];var __ATINIT__=[];var __ATMAIN__=[];var __ATEXIT__=[];var __ATPOSTRUN__=[];var runtimeInitialized=false;var runtimeExited=false;function preRun(){if(Module["preRun"]){if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];while(Module["preRun"].length){addOnPreRun(Module["preRun"].shift())}}callRuntimeCallbacks(__ATPRERUN__)}function ensureInitRuntime(){checkStackCookie();if(runtimeInitialized)return;runtimeInitialized=true;callRuntimeCallbacks(__ATINIT__)}function preMain(){checkStackCookie();callRuntimeCallbacks(__ATMAIN__)}function postRun(){checkStackCookie();if(Module["postRun"]){if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];while(Module["postRun"].length){addOnPostRun(Module["postRun"].shift())}}callRuntimeCallbacks(__ATPOSTRUN__)}function addOnPreRun(cb){__ATPRERUN__.unshift(cb)}function addOnPostRun(cb){__ATPOSTRUN__.unshift(cb)}function writeArrayToMemory(array,buffer){assert(array.length>=0,"writeArrayToMemory array must have a length (should be an array or typed array)");HEAP8.set(array,buffer)}function writeAsciiToMemory(str,buffer,dontAddNull){for(var i=0;i<str.length;++i){assert(str.charCodeAt(i)===str.charCodeAt(i)&255);SAFE_HEAP_STORE(buffer++|0,str.charCodeAt(i)|0,1)}if(!dontAddNull)SAFE_HEAP_STORE(buffer|0,0|0,1)}function unSign(value,bits,ignore){if(value>=0){return value}return bits<=32?2*Math.abs(1<<bits-1)+value:Math.pow(2,bits)+value}assert(Math.imul,"This browser does not support Math.imul(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");assert(Math.fround,"This browser does not support Math.fround(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");assert(Math.clz32,"This browser does not support Math.clz32(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");assert(Math.trunc,"This browser does not support Math.trunc(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");var Math_abs=Math.abs;var Math_ceil=Math.ceil;var Math_floor=Math.floor;var Math_fround=Math.fround;var Math_min=Math.min;var runDependencies=0;var runDependencyWatcher=null;var dependenciesFulfilled=null;var runDependencyTracking={};function getUniqueRunDependency(id){var orig=id;while(1){if(!runDependencyTracking[id])return id;id=orig+Math.random()}return id}function addRunDependency(id){runDependencies++;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}if(id){assert(!runDependencyTracking[id]);runDependencyTracking[id]=1;if(runDependencyWatcher===null&&typeof setInterval!=="undefined"){runDependencyWatcher=setInterval((function(){if(ABORT){clearInterval(runDependencyWatcher);runDependencyWatcher=null;return}var shown=false;for(var dep in runDependencyTracking){if(!shown){shown=true;err("still waiting on run dependencies:")}err("dependency: "+dep)}if(shown){err("(end of list)")}}),1e4)}}else{err("warning: run dependency added without ID")}}function removeRunDependency(id){runDependencies--;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}if(id){assert(runDependencyTracking[id]);delete runDependencyTracking[id]}else{err("warning: run dependency removed without ID")}if(runDependencies==0){if(runDependencyWatcher!==null){clearInterval(runDependencyWatcher);runDependencyWatcher=null}if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback()}}}Module["preloadedImages"]={};Module["preloadedAudios"]={};var dataURIPrefix="data:application/octet-stream;base64,";function isDataURI(filename){return String.prototype.startsWith?filename.startsWith(dataURIPrefix):filename.indexOf(dataURIPrefix)===0}function integrateWasmJS(){var wasmBinaryFile="data:application/octet-stream;base64,AGFzbQEAAAABvwIuYAV/f39/fwF/YAJ/fwF/YAN/fH8AYAF/AGAEf39+fwF+YAV/f39+fwF+YAN/f38Bf2ABfwF/YAN/f34Bf2ACf38AYAABf2AAAGADf39/AGACf34Bf2ADf39/AX5gAn5/AX9gA39+fwF/YAN/f34BfmAFf39/f38BfmAEf35/fwF/YAR/f39/AX9gBH9/f38BfmAFf35/f38Bf2ADf35/AX5gAn9/AX5gBX9/fn9/AX9gA39+fwBgAX4Bf2AEf39+fwF/YAJ/fABgAn9+AX5gBH9/f34BfmAFf39/fn8AYAV+fn9+fwF+YAF/AX5gB39+f39/fn8Bf2ACf34AYAZ/f39/f38Bf2AEf39/fwBgA35/fwF/YAV/f39/fwBgBn98f39/fwF/YAJ8fwF8YAJ/fwF8YAN/f34AYAN/f3wAAvwCLANlbnYBYgADA2VudgFjAAsDZW52AWQACwNlbnYBZQADA2VudgFmAAEDZW52AWcAAwNlbnYBaAABA2VudgFpAAMDZW52AWoABwNlbnYBawABA2VudgFsAAEDZW52AW0AAQNlbnYBbgABA2VudgFvAAMDZW52AXAAAwNlbnYBcQADA2VudgFyAAMDZW52AXMAAwNlbnYBdAAHA2VudgF1AAcDZW52AXYABgNlbnYBdwABA2VudgF4AAEDZW52AXkAAQNlbnYBegABA2VudgFBAAEDZW52AUIAAQNlbnYBQwABA2VudgFEAAEDZW52AUUACgNlbnYBRgABA2VudgFHAAMDZW52AUgAAwNlbnYBSQADA2VudgFKAAMDZW52AUsAAwNlbnYBTAADA2VudgFNAAMDZW52AU4ACgNlbnYBTwAKA2VudgxfX3RhYmxlX2Jhc2UDfwADZW52AWEDfwADZW52Bm1lbW9yeQIAgAIDZW52BXRhYmxlAXABNzcD+gL4AgEMGAwsAQwBAQEBAwwHAwYGAywBBw0DCQwJKBgmBAYHDQcDEAYkESwiAwgDAywYByIYAQcrAQMGAQEGAwEDLRMPDBMHBwEBBwkUEwYULAwFBwMHBgcmAxQiBx0OBhUOABwHExcAAwMDAQcMAQAHDAklBwYTAxMDIBQcCQAGGRATExUGAQcAAQYSAwQHDCoBBwYMBwYHAQYGEAkPDAwMAwMDAQEHEAkHBgEBBwkZDSEUBwYGBgMA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IQELIANBEEkEQCAEQQQgACADaiIAQQNyECkgACAEakEEaiIAQQAgAEEAEChBAXIQKQUCQCAEQQQgAEEDchApIAdBBCADQQFyECkgAyAHakEAIAMQKSADQQN2IQIgA0GAAkkEQCACQQN0QYyjAWohAEHkogFBABAoIgFBASACdCICcQR/IABBCGoiAkEAECgFQeSiAUEAIAEgAnIQKSAAQQhqIQIgAAshASACQQAgBxApIAFBDCAHECkgB0EIIAEQKSAHQQwgABApDAELIANBCHYiAAR/IANB////B0sEf0EfBSAAIABBgP4/akEQdkEIcSICdCIFQYDgH2pBEHZBBHEhAEEOIAAgAnIgBSAAdCIAQYCAD2pBEHZBAnEiAnJrIAAgAnRBD3ZqIgBBAXQgAyAAQQdqdkEBcXILBUEACyICQQJ0QZSlAWohACAHQRwgAhApIAdBEGoiBUEEQQAQKSAFQQBBABApQQEgAnQiBSABcUUEQEHoogFBACABIAVyECkgAEEAIAcQKSAHQRggABApIAdBDCAHECkgB0EIIAcQKQwBCyADIABBABAoIgBBBBAoQXhxRgRAIAAhAQUCQCADQQBBGSACQQF2ayACQR9GG3QhAgNAIABBEGogAkEfdkECdGoiBUEAECgiAQRAIAJBAXQhAiADIAFBBBAoQXhxRg0CIAEhAAwBCwsgBUEAIAcQKSAHQRggABApIAdBDCAHECkgB0EIIAcQKQwCCwsgAUEIaiIAQQAQKCICQQwgBxApIABBACAHECkgB0EIIAIQKSAHQQwgARApIAdBGEEAECkLCyAKJAUgBEEIag8LCwsLCwsLAkBB7KIBQQAQKCICIABPBEBB+KIBQQAQKCEBIAIgAGsiA0EPSwRAQfiiAUEAIAAgAWoiBRApQeyiAUEAIAMQKSAFQQQgA0EBchApIAEgAmpBACADECkgAUEEIABBA3IQKQVB7KIBQQBBABApQfiiAUEAQQAQKSABQQQgAkEDchApIAEgAmpBBGoiAEEAIABBABAoQQFyECkLDAELAkBB8KIBQQAQKCICIABLBEBB8KIBQQAgAiAAayICECkMAQsgAEEvaiIEQbymAUEAECgEf0HEpgFBABAoBUHEpgFBAEGAIBApQcCmAUEAQYAgEClByKYBQQBBfxApQcymAUEAQX8QKUHQpgFBAEEAEClBoKYBQQBBABApQbymAUEAIApBcHFB2KrVqgVzEClBgCALIgFqIgZBACABayIIcSIFIABNBEAgCiQFQQAPC0GcpgFBABAoIgEEQCAFQZSmAUEAECgiA2oiByADTSAHIAFLcgRAIAokBUEADwsLIABBMGohBwJAAkBBoKYBQQAQKEEEcQRAQQAhAgUCQAJAAkBB/KIBQQAQKCIBRQ0AQaSmASEDA0ACQCADQQAQKCIJIAFNBEAgCSADQQRqIglBABAoaiABSw0BCyADQQgQKCIDDQEMAgsLIAggBiACa3EiAkH/////B0kEQCACEFciASADQQAQKCAJQQAQKGpGBEAgAUF/Rw0GBQwDCwVBACECCwwCC0EAEFciAUF/RgR/QQAFQZSmAUEAECgiBiAFIAFBwKYBQQAQKCICQX9qIgNqQQAgAmtxIAFrQQAgASADcRtqIgJqIQMgAkH/////B0kgAiAAS3EEf0GcpgFBABAoIggEQCADIAZNIAMgCEtyBEBBACECDAULCyABIAIQVyIDRg0FIAMhAQwCBUEACwshAgwBCyABQX9HIAJB/////wdJcSAHIAJLcUUEQCABQX9GBEBBACECDAIFDAQLAAtBxKYBQQAQKCIDIAQgAmtqQQAgA2txIgNB/////wdPDQJBACACayEEIAMQV0F/RgR/IAQQVxpBAAUgAiADaiECDAMLIQILQaCmAUEAQaCmAUEAEChBBHIQKQsgBUH/////B0kEQCAFEFchAUEAEFciAyABayIEIABBKGpLIQUgBCACIAUbIQIgBUEBcyABQX9GciABQX9HIANBf0dxIAEgA0lxQQFzckUNAQsMAQtBlKYBQQAgAkGUpgFBABAoaiIDECkgA0GYpgFBABAoSwRAQZimAUEAIAMQKQtB/KIBQQAQKCIFBEACQEGkpgEhAwJAAkADQCABIANBABAoIgQgA0EEaiIGQQAQKCIIakYNASADQQgQKCIDDQALDAELIANBDBAoQQhxRQRAIAQgBU0gASAFS3EEQCAGQQAgAiAIahApIAVBACAFQQhqIgFrQQdxQQAgAUEHcRsiA2ohASACQfCiAUEAEChqIgQgA2shAkH8ogFBACABEClB8KIBQQAgAhApIAFBBCACQQFyECkgBCAFakEEQSgQKUGAowFBAEHMpgFBABAoECkMAwsLCyABQfSiAUEA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IAIQKSAFQQwgARApDAILIARBCHYiAQR/IARB////B0sEf0EfBSABIAFBgP4/akEQdkEIcSICdCIDQYDgH2pBEHZBBHEhAUEOIAEgAnIgAyABdCIBQYCAD2pBEHZBAnEiAnJrIAEgAnRBD3ZqIgFBAXQgBCABQQdqdkEBcXILBUEACyICQQJ0QZSlAWohASAFQRwgAhApIAVBFEEAECkgB0EAQQAQKUHoogFBABAoIgNBASACdCIGcUUEQEHoogFBACADIAZyECkgAUEAIAUQKSAFQRggARApIAVBDCAFECkgBUEIIAUQKQwCCyAEIAFBABAoIgFBBBAoQXhxRgRAIAEhAgUCQCAEQQBBGSACQQF2ayACQR9GG3QhAwNAIAFBEGogA0EfdkECdGoiBkEAECgiAgRAIANBAXQhAyAEIAJBBBAoQXhxRg0CIAIhAQwBCwsgBkEAIAUQKSAFQRggARApIAVBDCAFECkgBUEIIAUQKQwDCwsgAkEIaiIBQQAQKCIDQQwgBRApIAFBACAFECkgBUEIIAMQKSAFQQwgAhApIAVBGEEAECkLCwVB9KIBQQAQKCIDRSABIANJcgRAQfSiAUEAIAEQKQtBpKYBQQAgARApQaimAUEAIAIQKUGwpgFBAEEAEClBiKMBQQBBvKYBQQAQKBApQYSjAUEAQX8QKUGYowFBAEGMowEQKUGUowFBAEGMowEQKUGgowFBAEGUowEQKUGcowFBAEGUowEQKUGoowFBAEGcowEQKUGkowFBAEGcowEQKUGwowFBAEGkowEQKUGsowFBAEGkowEQKUG4owFBAEGsowEQKUG0owFBAEGsowEQKUHAowFBAEG0owEQKUG8owFBAEG0owEQKUHIowFBAEG8owEQKUHEowFBAEG8owEQKUHQowFBAEHEowEQKUHMowFBAEHEowEQKUHYowFBAEHMowEQKUHUowFBAEHMowEQKUHgowFBAEHUowEQKUHcowFBAEHUowEQKUHoowFBAEHcowEQKUHkowFBAEHcowEQKUHwowFBAEHkowEQKUHsowFBAEHkowEQKUH4owFBAEHsowEQKUH0owFBAEHsowEQKUGApAFBAEH0owEQKUH8owFBAEH0owEQKUGIpAFBAEH8owEQKUGEpAFBAEH8owEQKUGQpAFBAEGEpAEQKUGMpAFBAEGEpAEQKUGY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AUEAIAAgAEIKgCIEQnZ+fKdB/wFxQTByECsgAEL/////nwFWBEAgBCEADAELCyAEpyECCyACBEADQCABQX9qIgFBACACIAJBCm4iA0F2bGpBMHIQKyACQQpPBEAgAyECDAELCwsgAQsbAQF/IAAgAq0QPSIDRQRADwsgAyABIAIQNxoLRAAgAiABEEgiAkUEQCADBEAgA0EAQQ4QKSADQQRBABApC0EADwsgACACQQQQKCABIAMQiAFBAE4EQCACDwsgAhA2QQALvAEBAX9B2AAQNSIBRQRAQQAPCyAABEAgAUEAIABBABAqECwgAUEIIABBCBAqECwgAUEQIABBEBAqECwgAUEYIABBGBAqECwgAUEgIABBIBAqECwgAUEoIABBKBAqECwgAUEwIABBMBAqECwgAUE4IABBOBAqECwgAUFAa0EAIABBQGtBABAqECwgAUHIACAAQcgAECoQLCABQdAAIABB0AAQKhAsBSABEHkLIAFBAEEAECkgAUEFQQEQKyABC0kBAX8jBSEBIwVBEGokBSMFIwZOBEBBEBAACyABQQAgABApQTwgARAVIgBBgGBLBEBBlKcBQQBBACAAaxApQX8hAAsgASQFIAALYAECfyAAQQAQLSICIAFBABAtIgNHIAJFcgR/IAIhASADBQN/IABBAWoiAEEAEC0iAiABQQFqIgFBABAtIgNHIAJFcgR/IAIhASADBQwBCwsLIQAgAUH/AXEgAEH/AXFrC9UIAQp/IABFBEAgARA1DwsgAUG/f0sEQEGUpwFBAEEMEClBAA8LQRAgAUELakF4cSABQQtJGyEEIABBfGoiB0EAECgiCEF4cSICIABBeGoiBmohBQJAIAhBA3EEQAJAIAIgBE8EQCACIARrIgFBD00NAyAHQQAgCEEBcSAEckECchApIAQgBmoiAkEEIAFBA3IQKSAFQQRqIgNBACADQQAQKEEBchApIAIgARDBAQwDCyAFQfyiAUEAEChGBEAgAkHwogFBABAoaiICIARNDQEgB0EAIAhBAXEgBHJBAnIQKSAEIAZqIgFBBCACIARrIgJBAXIQKUH8ogFBACABEClB8KIBQQAgAhApDAMLIAVB+KIBQQAQKEYEQCACQeyiAUEAEChqIgMgBEkNASADIARrIgFBD0sEQCAHQQAgCEEBcSAEckECchApIAQgBmoiAkEE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ASACEJMBIg8gAkGACnFBgApGciIRBEACQCAJQhwQSCIFRQ0CIAJBgAhxRSEDAkAgAkGAAnEEQCABQSBqIQcgAwRAIAdBABAqQv////8PWARAIAFBKBAqQv////8PWA0DCwsgBSABQSgQKhBNIAUgB0EAECoQTQUgAwRAIAFBIBAqQv////8PWARAIAFBKBAqQv////8PWARAIAFByAAQKkL/////D1gNBAsLCyABQSgQKiITQv7///8PVgRAIAUgExBNCyABQSAQKiITQv7///8PVgRAIAUgExBNCyABQcgAECoiE0L+////D1YEQCAFIBMQTQsLCyAFQQAQLUEBcQRAQQECfkIAIAVBABAtQQFxRQ0AGiAFQRAQKgunQf//A3EgCUGABhB0IQMgBRA2IANBACAEECkgAyEEDAELDAMLCyAGQf99akEQdEEQdUH//wNxQQNIIgcEQAJAIA5CBxBIIgVFDQIgBUECED8gBUGcjwFBAhBpIAUgEEEAEDFB/wFxEM0BIAUgAUEQEChB//8DcRA/IAVBABAtQQFxBEBBgbJ+QQcgDkGABhB0IQMgBRA2IANBACAEECkgAyEEDAELDAMLCyANQi4QSCIDRQ0AIANBpI8BQZ+PASACQYACcUUiBRtBBBBpIAUEQCADIA8Ef0EtBSABQQgQMAtB//8DcRA/CyADIA8Ef0EtBSABQQoQMAtB//8DcRA/IAMgAUEMEDEQPyAHBEAgA0HjABA/BSADIAFBEBAoQf//A3EQPwsgAUEUECggCCAMELQBIAMgCEEAEDEQPyADIAxBABAxED8CQAJAIAdFDQAgAUEoECpCFFoNACADQQAQQQwBCyADIAFBGBAoEEELIAFBIBAqIRMCQAJAAkAgBQRAIBNC/////w9UDQEgA0F/EEEMAgUgE0L+////D1gEQCABQSgQKkL+////D1gNAgsgA0F/EEEgA0F/EEELDAILIAMgE6cQQQsgAUEoECoiE0L/////D1QEQCADIBOnEEEFIANBfxBBCwsgAyAKQQAQKCIGBH8gBkEEEDEFQQALED8gAyABQTRqIghBABAoIAIQqwFB//8DcSAEQYAGEKsBQf//A3FqQf//A3EQPyAFBEAgAyALQQAQKCIGBH8gBkEEEDEFQQALED8gAyABQTwQKEH//wNxED8gAyABQUBrQQAQMRA/IAMgAUHEABAoEEEgAUHIABAqIhNC/////w9UBEAgAyATpxBBBSADQX8QQQsLIANBABAtQQFxRQRAIABBCGoiAARAIABBAEEUECkgAEEEQQAQKQsgAxA2DAMLAn8gACANAn5CACADQQAQLUEBcUUNABogA0EQECoLEFJBAEghEiADEDYgEgsNAiAKQQAQKCIBBEAgACABENABQQBIDQMLIAQEQCAAIARBgAYQqgFBAEgNAwsgBBBTIAhBABAoIgEEQCAAIAEgAhCqAUEASA0ECyAFBEAgC0EAECgiAQRAIAAgARDQAUEASA0FCwsgCSQFIBFBAXEPCyAAQQhqIgAEQCAAQQBBDhApIABBBEEAECkLDAELIABBCGoiAARAIABBAEEUECkgAEEEQQAQKQsgBRA2CyAEEFMLIAkkBUF/C7EBAQV/IABBzAAQKBogABC+AiAAQQAQKEEBcUEARyIERQRAQZinARAHIABBOGohAiAAQTQQKCIBBEAgAUE4IAJBABAoECkLIAEhAyACQQAQKCIBBEAgAUE0IAMQKQsgAEGgpwFBABAoRgRAQaCnAUEAIAEQKQtBmKcBEAULIAAQlQECfyAAIABBDBAoQQdxEQcAIQUgAEHcABAoIgIEQCACEDMLIARFBEAgABAzCyAFC3ILmwMBCH8gAEG4LWoiCEEAEDAgA0H//wNxIgogAEG8LWoiCUEAECgiA3RyIQcgCEEAIAcQLiADQQ1KBEACfyAAQQhqIgNBABAoIQsgAEEUaiIEQQAQKCEGIARBACAGQQFqECkgCwsgBmpBACAHECsgCEEAEDBBCHYhByADQQAQKCEGIARBACAEQQAQKCIFQQFqECkgBSAGakEAIAcQKyAIQQAgCkEQIAlBABAoIgVrdhAuIAlBACAFQXNqECkFIAlBACADQQNqECkgAEEUaiEEIABBCGohAwsgABDHASADQQAQKCEFIARBACAEQQAQKCIAQQFqECkgACAFakEAIAIQKyADQQAQKCEFIARBACAEQQAQKCIAQQFqECkgACAFakEAIAJBCHYiBhArIANBABAoIQUgBEEAIARBABAoIgBBAWoQKSAAIAVqQQAgAkH/AXMQKyADQQAQKCEFIARBACAEQQAQKCIAQQFqECkgACAFakEAIAZB/wFzECsgA0EAECggBEEAEChqIAEgAhA3GiAEQQAgAiAEQQAQKGoQKQvfBQEUfyAAQTxqIQogAEHsAGohBSAAQThqIQYgAEHwAGohCyAAQdwAaiEMIABBtC1qIQkgAEHIAGohByAAQdgAaiENIABB1ABqIQ4gAEHEAGohDyAAQUBrIRAgAEE0aiERIABB9ABqIghBABAoIQEgAEEsaiISQQAQKCIEIQIDQAJAIApBABAoIAFrIAVBABAoIgNrIQEgAyAEIAJB+n1qak8EQCAGQQAQKCICIAIgBGogBCABaxA3GiALQQAgC0EAECggBGsQKSAFQQAgBUEAECggBGsQKSAMQQAgDEEAECggBGsQKSAAENwCIAEgBGohAQsgAEEAECgiAkEEEChFDQAgCEEAIAIgCEEAECggBkEAECggBUEAEChqaiABEJoBIAhBABAoaiIBECkgASAJQQAQKCICakECSwRAAkAgB0EAIAVBABAoIAJrIgMgBkEAECgiE2pBABAvIhQQKSAHQQAgDkEAECggEyADQQFqakEAEC8gFCANQQAQKHRzcRApA0AgAkUNASAHQQAgDkEAECggBkEAECggA0ECampBABAvIAdBABAoIA1BABAodHNxIgEQKSAQQQAQKCADIBFBABAocUEBdGpBACAPQQAQKCABQQF0akEAEDEQLiAPQQAQKCAHQQAQKEEBdGpBACADEC4gCUEAIAlBABAoQX9qIgIQKSACIAhBABAoIgFqQQNPBEAgA0EBaiEDDAELCwsLIAFBhgJPDQAgAEEAEChBBBAoRQ0AIBJBABAoIQIMAQsLIApBABAoIgMgAEHALWoiAkEAECgiAE0EQA8LIAAgBUEAECggCEEAEChqIgFJBEAgASAGQQAQKGpBACADIAFrIgBBggIgAEGCAkkbIgAQRhogAkEAIAAgAWoQKQ8LIAFBggJqIgEgAE0EQA8LIAAgBkEAEChqQQAgAyAAayIDIAEgAGsiACAAIANLGyIAEEYaIAJBACACQQAQKCAAahApC6ACAQN/IAFB//8DcUUEQEEADwsCQAJAIAJBgDBxIgJBgBBIBH8gAg0BQQAFAn8CQCACQYAQayICBEAgAkGAEEYEQAwCBQwFCwALQQIMAQtBBAsLIQQMAQsgAwRAIANBAEESECkgA0EEQQAQKQtBAA8LQRQQNSICRQRAIAMEQCADQQBBDhApIANBBEEAECkLQQAPCyACQQAgAUH//wNxIgVBAWoQNSIGECkgBkUEQCACEDNBAA8LIAYgACAFEDcaIAJBABAoIAVqQQBBABArIAJBBCABEC4gAkEIQQAQKSACQQxBABApIAJBEEEAECkgBEUEQCACDwsgAiAEEGRBBUcEQCACDwsgAhBKIAMEQCADQQBBEhApIANBBEEAECkLQQALQwEBfyAAQSgQLUEBcQRAQn8PCyAAQSAQKAR+IABBAEIAQQcQRQUgAEEMaiIBBEAgAUEAQRIQKSABQQRBABApC0J/CwuaAgECfwJAIABBKBAtQQFxDQAgAEEkEChBA0YEQCAAQQxqIgBFDQEgAEEAQRcQKSAAQQRBABApDAELIABBIGoiAUEAECgEQCAAQRgQKkLAAINCAFEEQCAAQQxqIgBFDQIgAEEAQR0QKSAAQQRBABApDAILBSAAQQAQKCICBEAgAhCBAUEASARAIABBABAoQQxqIQEgAEEMaiIARQ0DIABBACABQQAQKBApIABBBCABQQQQKBApDAMLCyAAQQBCAEEAEEVCAFMEQCAAQQAQKCIARQ0CIAAQWxoMAgsLIABBNEEAECsgAEE1QQAQKyAAQQxqIgAEQCAAQQBBABApIABBBEEAECkLIAFBACABQQAQKEEBahApQQAPC0F/C44BAQF/IABFBEAPC0QAAAAAAADwPyABIAFEAAAAAAAAAABkIgIgAUQAAAAAAADwP2NFcRtEAAAAAAAAAAAgAhsgAEEoEFwgAEEgEFwiAaGiIAGgIgEgAEEYaiICQQAQXKEgAEEQEFxkRQRADwsgAEEEECgaIABBABAoIAEgAEEMEChBNBECACACQQAgARBmC48EAgh/Bn4jBSEEIwVB4ABqJAUjBSMGTgRAQeAAEAALIAQQeSABQSBqIQggBEE0aiEHIAFBCGoiCUEAECoiC0IAUQR+QgAFIAFBABAoQQAQKEHIABAqCyIMIQ0CQAJAAkACQAJAAkADQAJAIA4gC1oNBCABQQAQKCAOpyIFQQR0akEAECgiA0HIABAqIgsgDSALIA1UGyINIAhBABAqIg9WDQAgA0EwECgiBgR/IAZBBBAxBUEAC0H//wNxrSALIANBIBAqfHxCHnwiECAMIBAgDFYbIgwgD1YNBQJ/IABBABAoIAtBABBLQQBIIQogAEEAECghAyAKCw0CIAQgA0EAQQEgAhCwAUJ/UQ0GIAFBABAoIAVBBHRqQQAQKCIDIAQQ4gENAyADQTQQKCAHQQAQKBCuASEDIAFBABAoIAVBBHRqQQAQKEE0IAMQKSABQQAQKCAFQQR0akEAEChBBEEBECsgB0EAQQAQKSAEEI8BIA5CAXwhDiAJQQAQKiELDAELCwwDCyADQQxqIQMgAgRAIAJBACADQQAQKBApIAJBBCADQQQQKBApCwwECyACBEAgAkEAQRUQKSACQQRBABApCwwCCyAEJAUgDCANfSIMQv///////////wAgDEL///////////8AVBsPCyACBEAgAkEAQRMQKSACQQRBABApCwwBCyAEEI8BCyAEJAVCfwtWACACEOoCIgJFBEBBAA8LIAJBACAAECkgAkEEIAEQKSABQRBxRQRAIAIPCyACQRRqIgBBACAAQQAQKEECchApIAJBGGoiAEEAIABBABAoQQJyECkgAgvuAQIEfwF+IABFBEBCfw8LIAFFBEAgAwRAIANBAEESECkgA0EEQQAQKQtCfw8LIAJBgyBxRQRAIABB0AAQKCABIAIgAxDtAQ8LQQVBBCACQQFxGyEFIABBMGohBiACQQJxRSEHAkADQAJAIAggBkEAECpaDQIgACAIIAIgAxCKASIEBEAgASAHBH8gBAUgBCAEIAQQR0EBahCnAiIEQQFqIARFGwsgBUEHcUEIahEBAEUNAQsgCEIBfCEIDAELCyADBEAgA0EAQQAQKSADQQRBABApCyAIDwsgAwRAIANBAEEJECkgA0EEQQAQKQtCfwsQACAAIAEgAiAAQQhqEIUBC9cBAgF/AX4gAyACQQBHckUEQEEADwsgAiADQQFxahA1IgVFBEAgBARAIARBAEEOECkgBEEEQQAQKQtBAA8LIAKtIQYgAARAAkAgACAGED0iAARAIAUgACACEDcaDAELIAQEQCAEQQBBDhApIARBBEEAECkLIAUQM0EADwsFIAEgBSAGIAQQiAFBAEgEQCAFEDNBAA8LCyADRQRAIAUPCyACIAVqIgFBAEEAECsgBSEAA0AgACABSQRAIABBABAtRQRAIABBAEEgECsLIABBAWohAAwBCwsgBQuBAQEBfiACQgBTBH8gAwRAIANBAEEUECkgA0EEQQAQKQtBfwUCfyAAIAEgAhBOIgRCAFMEQCAAQQxqIQAgAwRAIANBACAAQQAQKBApIANBBCAAQQQQKBApC0F/DAELIAQgAlMEfyADBEAgA0EAQREQKSADQQRBABApC0F/BUEACwsLC0QCAX8BfiAARQRAQQAPC0KFKiECA0AgAEEAEC0iAQRAIABBAWohACABQf8Bca0gAkIhfnxC/////w+DIQIMAQsLIAKnCyQBAX8gACABIAIgAxBnIgQEfyAEQTAQKEEAIAIgAxBxBUEACwu/AQECfyAAQUBrQQAQKCABp0EEdGpBABAoIgNFBEAgAgRAIAJBAEEUECkgAkEEQQAQKQtCAA8LAn8gAEEAECggA0HIABAqIgFBABBLQQBIIQQgAEEAECghACAECwRAIABBDGohACACBEAgAkEAIABBABAoECkgAkEEIABBBBAoECkLQgAPCyAAIAIQgwIiAEEASARAQgAPCyABIACtfCIBQgBZBEAgAQ8LIAIEQCACQQBBBBApIAJBBEEbECkLQgALiAEBAX8CQAJAA0ACQCAARQ0CIABBCBAwIAJB//8DcUYEQCADIABBBBAocUGABnENAQsgAEEAECghAAwBCwsMAQsgBCIFBEAgBUEAQQkQKSAFQQRBABApC0EADwsgAEEKaiECIAEEQCABQQAgAkEAEDEQLgsgAkEAEDFFBEBBvacBDwsgAEEMECgLFwAgABCcASAAQQAQKBBeIABBBBAoEF4LkwICA38BfiAARQRADwsgAEEAECgiAQRAIAEQWxogAEEAECgQPgsgAEEcECgQMyAAQSAQKBBKIABBJBAoEEogAEHQABAoEO4BIABBQGsiAUEAECgEQCAAQTBqIQMDQCAEIANBABAqVARAIAFBABAoIASnQQR0ahCNASAEQgF8IQQMAQsLIAFBABAoEDMLIABBxABqIQMgAEHMAGohAUIAIQQDQCAEIANBABAorVQEQCABQQAQKCAEp0ECdGpBABAoIgJBKEEBECsgAkEMEChFBEAgAkEMaiICBEAgAkEAQQgQKSACQQRBABApCwsgBEIBfCEEDAELCyABQQAQKBAzIABB1AAQKBCbAyAAQQhqEFQgABAzC+0BAQJ/AkACQAJAAkACQAJAIABBBWoiAUEAEC1BAXEEQCAAQQAQKEECcUUNAQsgAEEwaiICQQAQKBBKIAJBAEEAECkgAUEAEC1BAXFFDQELIABBABAoQQhxRQ0BCyAAQTRqIgJBABAoEFMgAkEA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AAAAAAAAAAAAAAAAAAABAAtBAQwBC0EACwVBAQsFQQELBUEBCwVBAQsFQQELC6oBAQJ/IAIgAEEEaiIEQQAQKCIDIAMgAksbIgJFBEBBAA8LIARBACADIAJrECkgASAAQQAQKCACEDcaAkACQAJAIABBHBAoQRgQKEEBaw4CAAECCyAAQTBqIgNBACADQQAQKCABIAIQYhApDAELIABBMGoiA0EAIANBABAoIAEgAhA4ECkLIABBACAAQQAQKCACahApIABBCGoiAEEAIABBABAoIAJqECkgAgtqACABQoCAgIAIfEL/////D1YEQCADBEAgA0EAQQQQKSADQQRBywAQKQtBfw8LIABBzAAQKBogACABpyACEK8CQQBOBEBBAA8LQZSnAUEAECghACADBEAgA0EAQQQQKSADQQQgABApC0F/C3kBA38gAEEIaiIBQQAQKCICBEAgAhA+IAFBAEEAECkLIABBBGoiAkEAECgiAQRAIAFBABAoIgNBAXEEQCABQRAQKEF+RgRAIAFBACADQX5xECkgAkEAECgiAUEAEChFBEAgARBeIAJBAEEAECkLCwsLIABBDEEAECsLmAICAn8BfiAAIAEgAkEAEGciBEUEQEF/DwsgACABIAIQpgEiBUUEQEF/DwsCQAJAIAJBCHENACAAQUBrQQAQKCABp0EEdGpBCBAoIgJFDQACQCACIAMQWkEATgRAIAMhACADQQAQKiEGDAELIABBCGoiAARAIABBAEEPECkgAEEEQQAQKQtBfw8LDAELIAMQZSADQSwgBEEYECgQKSADQRggBEEoECoQLCADQSggBEEUECgQKSADQSAgBEEgECoQLCADQTAgBEEQECgQLiADQTIgBEHSABAxEC4gA0EAIARBBhAtQQV0Qf8BcUFcckH/AXGtIgYQLCADIQALIANBECABECwgA0EIIAUQKSAAQQAgBkIDhBAsQQALLAEBfyAAQSRqIgFBABAoQX9qQQJPBEAPCyAAQQBCAEEKEEUaIAFBAEEAECkLhgICB38BfiMFIQUjBUEQaiQFIwUjBk4EQEEQEAALIARFIQkgAEEUaiEGIAFFIQogAEEMaiEHIABBEGohCANAIAwgA1QEQCAFQQAgAiAMpyILakEAEC0iABArIAkEQCAFQQAgAEH/AXEgBkEAEChB/f8DcSIEQQJyIARBA3Ns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BEAgAgwBCyAFQQdqIgJBABAtIABBBxAtRwRAIAIMAQsgBEEIaiICIANqIgVBABAtIABBCGoiAEEAEC1GIARB+gFJcQR/IAIhBAwCBSAFCwsLIBFrIgRBggJqIgAgAUoEQCAQQQAgCBApIAAgD04NBSAAIANqQQAQLSEGIAMgBEGBAmpqQQAQLSEHBSABIQALBSABIQALBSABIQALBSABIQALBSABIQALIAwgCCAOcUEBdCANakEAEDAiCE8NACAKQX9qIgoEQCAAIQEMAgsLCyAJIAAgACAJSxsL/woBFH8gAEEsaiIMQQAQKCICIABBDGoiEEEAEChBe2oiBSAFIAJLGyERAn8gAEEAECgiAkEEECghFCAAQbwtaiEOIABB7ABqIQYgAEHcAGohCSABQQRGIQ0gAUUhDyAAQQhqIQQgAEEUaiEHIABBOGohC0EAIQUDQAJAIAJBEBAoIgMgDkEAEChBKmpBA3UiCEkNACADIAhrIgMgBkEAECggCUEAEChrIgogAkEEEChqIghB//8DIAhB//8DSRsiEyATIANLGyIDIBFJBEAgAwRAIA9BAXMgAyAIRnFFDQIFIA0gAyAIRnFFDQILCyAAQQBBACANIAMgCEZxIggiBRB9IARBABAoIAdBABAoQXxqakEAIAMQKyAEQQAQKCAHQQAQKEF9ampBACADQQh2IgIQKyAEQQAQKCAHQQAQKEF+ampBACADQf8BcxArIARBABAoIAdBABAoQX9qakEAIAJB/wFzECsgAEEAECgQOSAKBEAgAEEAEChBDBAoIAtBABAoIAlBABAoaiADIAogCiADSxsiAhA3GiAAQQAQKEEMaiIKQQAgCkEAECggAmoQKSAAQQAQKEEQaiIKQQAgCkEAECggAmsQKSAAQQAQKEEUaiIKQQAgCkEAECggAmoQKSAJQQAgCUEAECggAmoQKSADIAJrIQMLIAMEQCAAQQAQKCICIAJBDBAoIAMQmgEaIABBABAoQQxqIgJBACADIAJBABAoahApIABBABAoQRBqIgJBACACQQAQKCADaxApIABBABAoQRRqIgJBACADIAJBABAoahApCyAAQQAQKCECIAhFDQELCyAUCyACQQQQKGsiAwR/An8gAyAMQQAQKCIESQR/IABBPBAoIAZBABAoIgJrIANNBEAgBkEAIAIgBGsiAhApIAtBABAoIgcgBCAHaiACEDcaIABBsC1qIgJBABAoIgRBAkkEQCACQQAgBEEBahApCwsgC0EAECggBkEAEChqIABBABAoQQAQKCADayADEDcaIAZBACADIAZBABAoaiICECkgDEEAECgFIABBsC1qQQBBAhApIAtBABAoIAJBABAoIARrIAQQNxogBkEAIAxBABAoIgIQKSACCyEVIAlBACACECkgFQsgAEG0LWoiB0EAECgiCGshBCAHQQAgCCAEIAMgAyAESxtqECkgAgUgBkEAECgLIQMgAEHALWoiBEEAECggA0kEQCAEQQAgAxApCyAFBEBBAw8LAkACQCABDgUBAAAAAQALIABBABAoQQQQKEUEQCADIAlBABAoRgRAQQEPCwsLIABBABAoIgFBBBAoIgUgAEE8ECggA2tBf2oiAksEQCAJQQAQKCIIIAxBABAoIgdOBEAgCUEAIAggB2sQKSAGQQAgAyAHayIBECkgC0EAECgiBSAFIAdqIAEQNxogAEGwLWoiAUEAECgiBUECSQRAIAFBACAFQQFqECkLIAIgDEEAEChqIQIgAEEAECgiAUEEECghBQsLIAUgAiACIAVLGyICBEAgASALQQAQKCAGQQAQKGogAhCaARogBkEAIAZBABAoIAJqIgEQKQUgBkEAECghAQsgBEEAECggAUkEQCAEQQAgARApCwJAAkAgASAJQQAQKCIDayIBIAxBABAoIgUgEEEAECggDkEAEChBKmpBA3VrIgJB//8DIAJB//8DSRsiAiACIAVLG08NAAJAIAEEQCAPDQEFIA1FDQELIABBABAoQQQQKEEARyABIAJLckUNAQsMAQsgDQR/IABBABAoQQQQKAR/QQAFIAEgAk0LBUEACyEFIAAgAyALQQAQKGogAiABIAEgAksbIgEgBRB9IAlBACAJQQAQKCABahApIABBABAoEDkgBQRAQQIPCwtBAAupAgEGfyAAEJkBBEBBfg8LIABBHGoiA0EAECgiAUEEECghBCABQQgQKCICBEAgAEEkECghASAAQSgQKCACIAFBAXFBNWoRCQAgA0EAECghAQsgAUHEABAoIgIEQCAAQSQQKCEBIABBKBAoIAIgAUEBcUE1ahEJACADQQAQKCEBCyABQUBrQQAQKCICBEAgAEEkECghASAAQSgQKCACIAFBAXFBNWoRCQAgA0EAECghAQsgAUE4ECgiBQRAIABBJGoiAUEAECghBiAAQShqIgJBABAoIAUgBkEBcUE1ahEJACABIQAgA0EAECghAQUgAEEoaiECIABBJGohAAsgAEEAECghACACQQAQKCABIABBAXFBNWoRCQAgA0EAQQAQKUF9QQAgBEHxAEYbCzIBAX8gAUIAUwR/IAIiAwRAIANBAEEEECkgA0EEQcsAECkLQX8FIAAgAUEAIAIQmwELCxkBAX8gAEIBED0iAkUEQA8LIAJBACABECsLGQEBfyAAQgEQPSIBRQRAQQAPCyABQQAQLQtaAQF/QcgAEDUiA0UEQEEADwsgA0EAIAIQKSADQQQgAEEBcRArIANBCEEJIAEgAUF/akEISxsQKSADQQxBABArIANBMEEAECkgA0E0QQAQKSADQThBABApIAMLHAAgAUUEQEEADwsgACABQQAQKCABQQQQMK0QUgtCAQF/IABFIAFFcgR/IAAgAUYFIABBBBAxIgIgAUEEEDFGBH8gAEEAECggAUEAECggAkH//wNxEExFBUEACwtBAXELJwEBf0EAQQBBABA4IQEgAEUEQCABDwsgASAAQQAQKCAAQQQQMBA4C6ACAQF+IAFBABAqIgJCAoNCAFIEQCAAQRAgAUEQECoQLCABQQAQKiECCyACQgSDQgBSBEAgAEEYIAFBGBAqECwgAUEAECohAgsgAkIIg0IAUgRAIABBICABQSAQKhAsIAFBABAqIQILIAJCEINCAFIEQCAAQSggAUEoECgQKSABQQAQKiECCyACQiCDQgBSBEAgAEEsIAFBLBAoECkgAUEAECohAgsgAkLAAINCAFIEQCAAQTAgAUEwEDEQLiABQQAQKiECCyACQoABg0IAUgRAIABBMiABQTIQMRAuIAFBABAqIQILIAJCgAKDQgBRBEAgAEEAIABBABAqIAKEECwPCyAAQTQgAUE0ECgQKSAAQQAgAEEAECogAUEAECqEECwLjAUBCX8jBSEFIwVBQGskBSMFIwZOBEBBwAAQAAsCQCAARQ0AIAEEQCABQTAQKiACVgRAIANBCHFFBEACQCABQUBrQQAQKCIGIAKnIgdBBHRqQQgQKEUEQCAHQQR0IAZqQQwQLUEBcUUNAQsgAEEIaiIABEAgAEEAQQ8QKSAAQQRBABApCwwECwsgASACIANBCHIgBRCdAUEA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QQAQKCIBRSIGBH9BAAUgAUEEEDELED8gA0EAEC1BAXFFBEAgAEEIaiIABEAgAEEAQRQQKSAAQQRBABApCyADEDYMAgsCfyAAIANBBBAoAn5CACADQQAQLUEBcUUNABogA0EQECoLEFJBAEghCSADEDYgCQsNASAGRQRAIAAgAUEAECggAUEEEDCtEFJBAEgNAgsgBSQFIAoPCyAAQQAQKEEMaiEBIABBCGoiAARAIABBACABQQAQKBApIABBBCABQQQQKBApCwsgBSQFQn8LdAECfyAAQcoAaiICQQAQLSEBIAJBACABIAFB/wFqchArIABBABAoIgFBCHEEfyAAQQAgAUEgchApQX8FIABBCEEAECkgAEEEQQAQKSAAQRwgAEEsECgiARApIABBFCABECkgAEEQIAEgAEEwEChqEClBAAsLSAEBfyAAQcQAECgEQCAAQfAAaiEBIABB9AAQKCIABEAgAEHwACABQQAQKBApCyABQQAQKCIBQfQAakGUjgEgARtBACAAECkLC3kBA38jBSEDIwVBIGokBSMFIwZOBEBBIBAACyADQRBqIQQgAEEkQQgQKSAAQQAQKEHAAHFFBEAgA0EAIABBPBAoECkgA0EEQZOoARApIANBCCAEEClBNiADEAkEQCAAQcsAQX8QKwsLIAAgASACEL8BIQUgAyQFIAULoAIBBn8jBSEDIwVBIGokBSMFIwZOBEBBIBAACyADIgRBACABECkgA0EEaiIGQQAgAiAAQTBqIgdBABAoIgNBAEdrECkgBEEIIABBLGoiBUEAECgQKSAEQQwgAxApIARBEGoiA0EAIABBPBAoECkgA0EEIAQQKSADQQhBAhApQZEBIAMQGiIDQYBgSwRAQZSnAUEAQQAgA2sQKUF/IQMLIANBAUgEQCAAQQAgAEEAECggA0EwcUEQc3IQKSADIQIFIAMgBkEAECgiCEsEQCAAQQRqIgZBACAFQQAQKCIFECkgAEEIIAUgAyAIa2oQKSAHQQAQKARAIAZBACAFQQFqECkgASACQX9qakEAIAVBABAtECsLBSADIQILCyAEJAUgAgsGAEGUpwELjQEBAn8jBSEDIwVBIGokBSMFIwZOBEBBIBAACyADQQAgAEE8ECgQKSADQQRBABApIANBCCABECkgA0EMIANBFGoiABApIANBECACEClBjAEgAxAb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IAVBABAoIRMgA0EAIANBABAoIgZBAWoQKSATCyAGakEAQQgQKyAEQRxqIgZBABAoIgJFBEACfyAFQQAQKCEUIANBACADQQAQKCIGQQFqECkgFAsgBmpBAEEAECsCfyAFQQAQKCEVIANBACADQQAQKCIGQQFqECkgFQsgBmpBAEEAECsCfyAFQQAQKCEWIANBACADQQAQKCIGQQFqECkgFgsgBmpBAEEAECsCfyAFQQAQKCEXIANBACADQQAQKCIGQQFqECkgFwsgBmpBAEEAECsCfyAFQQAQKCEYIANBACADQQAQKCIGQQFqECkgGAsgBmpBAEEAECsgBEGEARAoIgJBCUYEf0ECBUEEQQAgAkECSCAEQYgBEChBAUpyGwshAgJ/IAVBABAoIRkgA0EAIANBABAoIgtBAWoQKSAZCyALakEAIAIQKwJ/IAVBABAoIRogA0EAIANBABAoIgVBAWoQKSAaCyAFakEAQQMQKyAJQQBB8QAQKSAAEDkgA0EAEChFBEAgCUEAECghAgwCCwwPCyACQQAQKEEAR0ECQQAgAkEsECgbckEEQQAgAkEQECgbckEIQQAgAkEcECgbckEQQQAgAkEkECgbckH/AXEhAgJ/IAVBABAoIRsgA0EAIANBABAoIghBAWoQKSAbCyAIakEAIAIQKyAGQQAQKEEEEChB/wFxIQICfyAFQQAQKCEcIANBACADQQAQKCIIQQFqECkgHAsgCGpBACACECsgBkEAEChBBBAoQQh2Qf8BcSECAn8gBUEAECghHSADQQAgA0EAECgiCEEBahApIB0LIAhqQQAgAhArIAZBABAoQQQQKEEQdkH/AXEhAgJ/IAVBABAoIR4gA0EAIANBABAoIghBAWoQKSAeCyAIakEAIAIQKyAGQQAQKEEEEChBGHYhAgJ/IAVBABAoIR8gA0EAIANBABAoIghBAWoQKSAfCyAIakEAIAIQKyAEQYQBECgiAkEJRgR/QQIFQQRBACACQQJIIARBiAEQKEEBSnIbCyECAn8gBUEAECghICADQQAgA0EAECgiCEEBahApICALIAhqQQAgAhArIAZBABAoQQwQKEH/AXEhAgJ/IAVBABAoISEgA0EAIANBABAoIghBAWoQKSAhCyAIakEAIAIQKyAGQQAQKCICQRAQKARAIAJBFBAoQf8BcSECAn8gBUEAECghIiADQQAgA0EAECgiCEEBahApICILIAhqQQAgAhArIAZBABAoQRQQKEEIdkH/AXEhAgJ/IAVBABAoISMgA0EAIANBABAoIghBAWoQKSAjCyAIakEAIAIQKyAGQQAQKCECCyACQSwQKARAIAtBACALQQAQKCAFQQAQKCADQQAQKBA4ECkLIARBIEEAECkgCUEAQcUAECkMAgsLIAJBxQBGDQAgAkHJAEYNASACQdsARg0CIAJB5wBGDQMMBAsgBEEcaiILQQAQKCICQRAQKARAIARBDGohDCAEQQhqIQcgAEEwaiEIIAJBFBAoQf//A3EgBEEgaiIFQQAQKGshBiADQQAQKCECA0AgAiAGaiAMQQAQKCIOSwRAIAIgB0EAEChqIAtBABAoQRAQKCAFQQAQKGogDiACayIOEDcaIANBACAMQQAQKCINECkgC0EAEChBLBAoQQBHIA0gAktxBEAgCEEAIAhBABAoIAIgB0EAEChqIA0gAmsQOBApCyAFQQAgDiAFQQAQKGoQKSAAEDkgA0EAECgNDiAGIA5rIQZBACECDAELCyACIAdBABAoaiALQQAQKEEQECggBUEAEChqIAYQNxogA0EAIAYgA0EAEChqIgYQKSALQQAQKEEsEChBAEcgBiACS3EEQCAIQQAgCEEAECggAiAHQQAQKGogBiACaxA4ECkLIAVBAEEAECkLIAlBAEHJABApCyAEQRxqIgtBABAoQRwQKARAIARBDGohDiAEQSBqIQcgBEEIaiEIIABBMGohBiADQQAQKCIFIQIDQCAOQQAQKCAFRgRAIAtBABAoQSwQKEEARyAFIAJLcQRAIAZBACAGQQAQKCACIAhBABAoaiAFIAJrEDgQKQsgABA5IANBABAoDQ1BACECQQAhBQsCfyALQQAQKEEcECghJCAHQQAgB0EAECgiDUEBahApICQLIA1qQQAQLSEMIAhBABAoIQ0gA0EAIAVBAWoQKSAFIA1qQQAgDBArIAwEQCADQQAQKCEFDAELCyALQQAQKEEsECgEQCADQQAQKCIFIAJLBEAgBkEAIAZBABAoIAIgCEEAEChqIAUgAmsQOBApCwsgB0EAQQAQKQsgCUEAQdsAECkLIARBHGoiC0EAEChBJBAoBEAgBEEMaiEOIARBIGohCCAEQQhqIQcgAEEwaiEGIANBABAoIgUhAgNAIA5BABAoIAVGBEAgC0EAEChBLBAoQQBHIAUgAktxBEAgBkEAIAZBABAoIAIgB0EAEChqIAUgAmsQOBApCyAAEDkgA0EAECgNDEEAIQJBACEFCwJ/IAtBABAoQSQQKCElIAhBACAIQQAQKCINQQFqECkgJQsgDWpBABAtIQwgB0EAECghDSADQQAgBUEBahApIAUgDWpBACAMECsgDARAIANBABAoIQUMAQsLIAtBABAoQSwQKARAIANBABAoIgUgAksEQCAGQQAgBkEAECggAiAHQQAQKGogBSACaxA4ECkLCwsgCUEAQecAECkLIARBHBAoQSwQKARAIANBABAoIgJBAmogBEEMEChLBEAgABA5IANBABAoDQpBACECCyAAQTBqIgVBABAoQf8BcSEGIARBCGoiC0EAECghByADQQAgAkEBahApIAIgB2pBACAGECsgBUEAEChBCHZB/wFxIQICfyALQQAQKCEmIANBACADQQAQKCILQQFqECkgJgsgC2pBACACECsgBUEAQQBBAEEAEDgQKQsgCUEAQfEAECkgABA5IANBABAoDQgLIA9BABAoDQELIARB9AAQKA0AIAEEQCAJQQAQKEGaBUcNAQVBAA8LDAELAkACQAJAAkAgBEGEARAoIgIEfwJ/AkACQAJAIARBiAEQKEECaw4CAAECCyAEIAEQ2QIMAgsgBCABENgCDAELIAJBDGxBiM4AakEAECghAiAEIAEgAkEHcUEIahEBAAsFIAQgARDKAQsOBAMCAAEECyAJQQBBmgUQKQwCCyAJQQBBmgUQKQwCCwJAAkACQCABQQFrDgUAAQEBAgELIAQQzQIMAQsgBEEAQQBBABB9IAFBA0YEQCAEQcQAaiIFQQAQKCAEQcwAaiICQQAQKEF/akEBdGpBAEEAEC4gBUEAEChBACACQQAQKEEBdEF+ahBGGiAEQfQAEChFBEAgBEHsAEEAECkgBEHcAEEAECkgBEG0LWpBAEEAECkLCwsgABA5IBBBABAoDQEMBgsgEEEAECgEQEEADwsMBQsgAUEERwRAQQAPCyAEQRhqIgVBABAoIgFBAUgEQEEBDwsgAEEwaiICQQAQKCEJIAFBAkYEQAJ/IARBCGoiAUEAECghJyADQQAgA0EAECgiCkEBahApICcLIApqQQAgCRArIAJBABAoQQh2Qf8BcSEEAn8gAUEAECghKCADQQAgA0EAECgiCkEBahApICgLIApqQQAgBBArIAJBABAoQRB2Qf8BcSEEAn8gAUEAECghKSADQQAgA0EAECgiCkEBahApICkLIApqQQAgBBArIAJBABAoQRh2IQICfyABQQAQKCEqIANBACADQQAQKCIJQQFqECkgKgsgCWpBACACECsgAEEIaiICQQAQKEH/AXEhBAJ/IAFBABAoISsgA0EAIANBABAoIgpBAWoQKSArCyAKakEAIAQQKyACQQAQKEEIdkH/AXEhBAJ/IAFBABAoISwgA0EAIANBABAoIgpBAWoQKSAsCyAKakEAIAQQKyACQQAQKEEQdkH/AXEhBAJ/IAFBABAoIS0gA0EAIANBABAoIgpBAWoQKSAtCyAKakEAIAQQKyACQQAQKEEYdiECAn8gAUEAECghLiADQQAgA0EAECgiBEEBahApIC4LIARqQQAgAhArBSAEIAlBEHYQcCAEIAJBABAoQf//A3EQcAsgABA5IAVBABAoIgBBAEoEQCAFQQBBACAAaxApCyADQQAQKEUPCwsLIABBGEHxmAEQKUF+DwsgAEEYQZ2ZARApQXsPCyAKQQBBfxApQQALmAIDBH8BfgF8IwUhAyMFQYBAayQFIwUjBk4EQEGAwAAQAAsgARCBAUEASARAIAFBDGohASAAQQhqIgAEQCAAQQAgAUEAECgQKSAAQQQgAUEEECgQKQsgAyQFQX8PCyAAQdQAaiEEIAJCAVMhBSACuSEIQgAhAgJAAkADQAJAIAEgA0KAwAAQTiIHQgBXDQIgACADIAcQUkEASARAQX8hAAwBCyAHQoDAAFEEQCAEQQAQKCIGRSAFckUEQCAGIAJCgEB9IgK5IAijEIIBCwsMAQsLDAELIAdCAFMEfyABQQxqIQQgAEEIaiIABEAgAEEAIARBABAoECkgAEEEIARBBBAoECkLQX8FQQALIQALIAEQWxogAyQFIAALmQEBBH8gAEEsECghASAAQcQAECggAEHMABAoIgJBAXRqIQMDQCADQX5qIgNBABAwIQQgA0EAQQAgBCABa0H//wNxIAEgBEsbEC4gAkF/aiICDQALIABBQGtBABAoIAFBAXRqIQIgASEAA0AgAkF+aiICQQAQMCEDIAJBAEEAIAMgAWtB//8DcSABIANLGxAuIABBf2oiAA0ACwuNDgEifyAAQfQAaiEGIAFBAEchGyAAQcgAaiEMIABB2ABqIRYgAEE4aiEJIABB7ABqIQMgAEHUAGohFyAAQcQAaiEOIABBQGshGCAAQTRqIRkgAEHgAGohByAAQfgAaiEKIABB8ABqIQ8gAEHkAGohECAAQYABaiEcIABB6ABqIQ0gAEEsaiEdIABBpC1qIREgAEGgLWohBSAAQZgtaiESIABBnC1qIRogAEHcAGohCCAAQYgBaiEeAkACQANAAkACQAJAIAZBABAoQYYCTw0AIAAQfiAGQQAQKCICQYUCSyAbckUNBCACRQ0CIAJBAksNACAKQQAgB0EAECgQKSAQQQAgD0EAECgQKSAHQQBBAhApQQIhAgwBCyAMQQAgF0EAECggCUEAECggA0EAECgiAkECampBABAvIAxBABAoIBZBABAodHNxIgQQKSAYQQAQKCACIBlBABAocUEBdGpBACAOQQAQKCAEQQF0akEAEDEiAhAuIA5BABAoIAxBABAoQQF0akEAIANBABAoEC4gCkEAIAdBABAoIgQQKSAQQQAgD0EAECgQKSAHQQBBAhApIAJB//8DcSICBEAgBCAcQQAQKEkEQCADQQAQKCACayAdQQAQKEH6fWpLBEBBAiECBSAHQQAgACACEMkBIgIQKSACQQZJBEAgHkEAEChBAUcEQCACQQNHDQUgA0EAECggD0EAEChrQYAgTQRAQQMhAgwGCwsgB0EAQQIQKUECIQILCwVBAiECCwVBAiECCwsgCkEAECgiBEEDSSACIARLcgRAAkAgDUEAEChFBEAgDUEAQQEQKSADQQAgA0EAEChBAWoQKSAGQQAgBkEAEChBf2oQKQwBCyAJQQAQKCADQQAQKEF/ampBABAtIQIgEUEAECggBUEAEChBAXRqQQBBABAuAn8gEkEAECghHyAFQQAgBUEAECgiC0EBahApIB8LIAtqQQAgAhArIABBlAFqIAJB/wFxQQJ0aiICQQAgAkEAEDFBAWoQLiAFQQAQKCAaQQAQKEF/akYEQCAAIAhBABAoIgJBf0oEfyACIAlBABAoagVBAAsgA0EAECggAmtBABBEIAhBACADQQAQKBApIABBABAoEDkLIANBACADQQAQKEEBahApIAZBACAGQQAQKEF/ahApIABBABAoQRAQKEUNBAsFAn8gBkEAECghISARQQAQKCAFQQAQKEEBdGpBACADQQAQKCITQf//A2ogEEEAEChrQf//A3EiAhAuAn8gEkEAECghICAFQQAgBUEAECgiFUEBahApICALIBVqQQAgBEH9AWoiBBArIARB/wFxQbDmAGpBABAvQYACckECdCAAakGYAWoiBEEAIARBABAxQQFqEC4gAkF/akEQdEEQdSIEQf//A3EhAiAhCyATakF9aiELIABBiBNqIARB//8DcUGAAkgEfyACQbDiAGpBABAvBSACQQd2QbDkAGpBABAvC0ECdGoiAkEAIAJBABAxQQFqEC4gBUEAECgCfyAaQQAQKEF/aiEiIAZBACAGQQAQKCAKQQAQKCICQX9qaxApIApBACACQX5qIgIQKQNAIANBACADQQAQKCIVQQFqIgQQKSAEIAtNBEAgDEEAIBdBABAoIAlBABAoIBVBA2pqQQAQLyAMQQAQKCAWQQAQKHRzcSICECkgGEEAECggBCAZQQAQKHFBAXRqQQAgDkEAECggAkEBdGpBABAxEC4gDkEAECggDEEAEChBAXRqQQAgA0EAECgQLiAKQQAQKCECCyAKQQAgAkF/aiICECkgAg0ACyANQQBBABApIAdBAEECECkgA0EAIANBABAoQQFqIgsQKSAiC0YEQCAAIAhBABAoIgJBf0oEfyACIAlBABAoagVBAAsgCyACa0EAEEQgCEEAIANBABAoECkgAEEAECgQOSAAQQAQKEEQEChFDQQLCwwBCwsgDUEAECgEQCAJQQAQKCADQQAQKEF/ampBABAtIQIgEUEAECggBUEAEChBAXRqQQBBABAuAn8gEkEAECghIyAFQQAgBUEAECgiB0EBahApICMLIAdqQQAgAhArIABBlAFqIAJB/wFxQQJ0aiICQQAgAkEAEDFBAWoQLiANQQBBABApCyAAQbQtakEAIANBABAoIgJBAiACQQJJGxApIAFBBEYEQCAIQQAQKCIBQX9MBEAgAEEAIAIgAWtBARBEDAMLIAAgASAJQQAQKGogAiABa0EBEEQMAgsgBUEAECgEQCAAIAhBABAoIgFBf0oEfyABIAlBABAoagVBAAsgAiABa0EAEEQgCEEAIANBABAoECkgAEEAECgQOSAAQQAQKEEQEChFBEBBAA8LC0EBDwtBAA8LIAhBACADQQAQKBApIABBABAoEDlBA0ECIABBABAoQRAQKBsLgwsBGn8gAEH0AGohCyABQQBHIRUgAEHIAGohByAAQdgAaiENIABBOGohCCAAQewAaiEDIABB1ABqIQ4gAEHEAGohDCAAQUBrIRAgAEE0aiERIABB4ABqIQkgAEEsaiEWIABB8ABqIRcgAEGkLWohEiAAQaAtaiEFIABBmC1qIRMgAEHcAGohCiAAQZwtaiEUIABBgAFqIRgCQAJAA0ACQAJAAkAgC0EAEChBhgJJBEAgABB+IAtBABAoIgJBhQJLIBVyRQ0FIAJFDQMgAkECTQ0BCyAHQQAgDkEAECggCEEAECggA0EAECgiAkECampBABAvIAdBABAoIA1BABAodHNxIgQQKSAQQQAQKCACIBFBABAocUEBdGpBACAMQQAQKCAEQQF0akEAEDEiAhAuIAxBABAoIAdBABAoQQF0akEAIANBABAoEC4gAkUNACADQQAQKCACQf//A3EiAmsgFkEAEChB+n1qSw0AIAlBACAAIAIQyQEiAhApDAELIAlBABAoIQILAkACQCACQQJLBEACQCASQQAQKCAFQQAQKEEBdGpBACADQQAQKCAXQQAQKGtB//8DcSIEEC4CfyATQQAQKCEZIAVBACAFQQAQKCIPQQFqECkgGQsgD2pBACACQf0BaiICECsgAkH/AXFBsOYAakEAEC9BgAJyQQJ0IABqQZgBaiICQQAgAkEAEDFBAWoQLiAEQX9qQRB0QRB1IgRB//8DcSECIABBiBNqIARB//8DcUGAAkgEfyACQbDiAGpBABAvBSACQQd2QbDkAGpBABAvC0ECdGoiAkEAIAJBABAxQQFqEC4gBUEAECggFEEAEChBf2pGIQQgC0EAIAtBABAoIAlBABAoIgJrIgYQKSACIBhBABAoTSAGQQJLcUUEQCADQQAgAiADQQAQKGoiAhApIAlBAEEAECkgB0EAIAIgCEEAECgiBmpBABAvIg8QKSAHQQAgDkEAECggBiACQQFqakEAEC8gDyANQQAQKHRzcRApIARFDQEMAwsgCUEAIAJBf2oQKQNAIANBACADQQAQKCICQQFqIgYQKSAHQQAgDkEAECggCEEAECggAkEDampBABAvIAdBABAoIA1BABAodHNxIgIQKSAQQQAQKCAGIBFBABAocUEBdGpBACAMQQAQKCACQQF0akEAEDEQLiAMQQAQKCAHQQAQKEEBdGpBACADQQAQKBAuIAlBACAJQQAQKEF/aiICECkgAg0ACyADQQAgA0EAEChBAWoiAhApIAQNAgsFIAhBABAoIANBABAoakEAEC0hAiASQQAQKCAFQQAQKEEBdGpBAEEAEC4CfyATQQAQKCEaIAVBACAFQQAQKCIGQQFqECkgGgsgBmpBACACECsgAEGUAWogAkH/AXFBAnRqIgJBACACQQAQMUEBahAuAn8gBUEAECggFEEAEChBf2pGIRsgC0EAIAtBABAoQX9qECkgA0EAIANBABAoQQFqIgIQKSAbCw0BCwwBCyAAIApBABAoIgRBf0oEfyAEIAhBABAoagVBAAsgAiAEa0EAEEQgCkEAIANBABAoECkgAEEAECgQOSAAQQAQKEEQEChFDQMLDAELCyAAQbQtakEAIANBABAoIgJBAiACQQJJGxApIAFBBEYEQCAKQQAQKCIBQX9MBEAgAEEAIAIgAWtBARBEDAMLIAAgASAIQQAQKGogAiABa0EBEEQMAgsgBUEAECgEQCAAIApBABAoIgFBf0oEfyABIAhBABAoagVBAAsgAiABa0EAEEQgCkEAIANBABAoECkgAEEAECgQOSAAQQAQKEEQEChFBEBBAA8LC0EBDwtBAA8LIApBACADQQAQKBApIABBABAoEDlBA0ECIABBABAoQRAQKBsL9QEBAn8gAEE8IABBLBAoQQF0ECkgAEHEAGoiAkEAECggAEHMAGoiAUEAEChBf2pBAXRqQQBBABAuIAJBABAoQQAgAUEAEChBAXRBfmoQRhogAEGAASAAQYQBECgiAUEMbEGCzgBqQQAQMBApIABBjAEgAUEMbEGAzgBqQQAQMBApIABBkAEgAUEMbEGEzgBqQQAQMBApIABB/AAgAUEMbEGGzgBqQQAQMBApIABB7ABBABApIABB3ABBABApIABB9ABBABApIABBtC1qQQBBABApIABB+ABBAhApIABB4ABBAhApIABB6ABBABApIABByABBABApCzEAIABBABAoEFhCAFMEQEF/DwsgACABIAIQvAJCAFMEf0F/BSAAQQAQKBBYQj+HpwsLrAEBA38gABCZAQRAQX4PCyAAQRRBABApIABBCEEAECkgAEEYQQAQKSAAQSxBAhApIABBHBAoIgFBFEEAECkgAUEQIAFBCBAoECkgAUEYaiIDQQAQKCICQQBIBEAgA0EAQQAgAmsiAhApCyABQQRBOUEqQfEAIAIbIAJBAkYiAhsQKSAAQTAgAgR/QQBBAEEAEDgFQQBBAEEAEGILECkgAUEoQQAQKSABEM4CQQAL7gQBCn8gAEUEQEF+DwsgAEEYaiIGQQBBABApIABBIGoiA0EAECgiAkUEQCADQQBBBxApIABBKEEAEClBByECCyAAQSRqIgRBABAoRQRAIARBAEEBECkLIAFBf0YEQEEGIQEFIAFBCUsEQEF+DwsLIABBKGoiBEEAEChBAUHELSACQQ9xQRBqEQYAIgJFBEBBfA8LIABBHCACECkgAkEAIAAQKSACQQRqIgdBAEEqECkgAkEYQQAQKSACQRxBABApIAJBMEEPECkgAkEsaiIFQQBBgIACECkgAkE0Qf//ARApIAJB0ABBEBApIAJBzABqIghBAEGAgAQQKSACQdQAQf//AxApIAJB2ABBBhApIAJBOGoiCUEAIARBABAoQYCAAkECIANBABAoQQ9xQRBqEQYAECkgAkFAayIKQQAgBEEAECggBUEAEChBAiADQQAQKEEPcUEQahEGABApIAJBxABqIgtBACAEQQAQKCAIQQAQKEECIANBABAoQQ9xQRBqEQYAECkgAkHALWpBAEEAECkgAkGcLWoiBUEAQYCAAhApIAJBCCAEQQAQKEGAgAJBBCADQQAQKEEPcUEQahEGACIDECkgAkEMIAVBABAoIgRBAnQQKSAJQQAQKARAIApBABAoBEAgC0EAEChFIANFckUEQCACQaQtakEAIARBAXZBAXQgA2oQKSACQZgtakEAIAMgBEEDbGoQKSACQYQBIAEQKSACQYgBQQAQKSACQSRBCBArAn8gABDhAiIBBEAgAQwBCyAAQRwQKBDfAiABCw8LCwsgB0EAQZoFECkgBkEAQYmZARApIAAQywEaQXwLpAgBA38gAEF/cyEAA0ACQCACRQRAQQAhAgwBCyABQQNxBEAgAUEAEC8gAEH/AXFzQQJ0QYAOakEAECggAEEIdnMhACABQQFqIQEgAkF/aiECDAILCwsgASACIAJBf3MiA0FgIANBYEsbakEgakFgcSIEaiEFIAIhAwNAIANBH0sEQCABQRwQKCABQRgQKCABQRQQKCABQRAQKCABQQwQKCABQQgQKCABQQQQKCAAIAFBABAocyIAQf8BcUECdEGA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BkH/AXFBAXRyEC4gAiAIQYAIcUEARxCAAiAAIAIgCBB7IgFBAEgNAyABIAxHDQIgAEEAECggEhDVAUEATgRAIAQkBUEADwsgAEEAEChBDGohASAAQQhqIgAEQCAAQQAgAUEAECgQKSAAQQQgAUEEECgQKQsgBCQFQX8PCyAAQQAQKEEMaiEBIABBCGoiAARAIABBACABQQAQKBApIABBBCABQQQQKBApCwwCCyABED4MAQsgAEEIaiIABEAgAEEAQRQQKSAAQQRBABApCwsgBCQFQX8LRAECfiAAQQAQLUEBcQRAIAEgAEEQECoiAnwiAyABWgRAIAMgAEEIECpYBEAgAEEEECggAqdqDwsLCyAAQQBBABArQQALCwBBACABIAIQzwELvgECAX8BfiAAQSBqIgNBACACQQAQKiIEQv////8PIARC/////w9UGxB1IABBHCABECkgAEEQaiEBIABBBBAtQQFxBH8gASAAQQwQLUECdEEEcRDaAgUgARDTAgshASACQQAgAkEAECogA0EAECitfRAsAkACQAJAAkAgAUF7aw4HAQMDAwMCAAMLQQEPCyAAQRQQKEUEQEEDDwsMAQtBAA8LIABBABAoIgAEQCAAQQBBDRApIABBBCABECkLQQILwgECBH8DfiAAQTAQKiEIIABBQGshBQJ/AkAgAEEoEC1BAXENACAAQRgQKCAAQRQQKEcNAEEADAELQQELIQADQCAGIAhUBEAgBUEAECgiAyAGpyICQQR0akEMEC0hBAJAAkAgAkEEdCADakEIECggBEEBcXINACACQQR0IANqQQQQKCICBEAgAkEAECgNAQsMAQtBASEACyAHIARBAXFBAXOtfCEHIAZCAXwhBgwBCwsgAUUEQCAADwsgAUEAIAcQLCAACwoAIABBDEEBECsLTwEBfyACQv////8PWARAIABBFGoiA0EAEChFBEAgA0EAIAIQdSAAQRAgARApQQEPCwsgAEEAECgiAARAIABBAEESECkgAEEEQQAQKQtBAAtIAQF/IABBEGohASAAQQQQLUEBcQR/IAEQywEFIAEQ0AILIgFFBEBBAQ8LIABBABAoIgAEQCAAQQBBDRApIABBBCABECkLQQALbAEBfyAAQRRBABApIABBEGoiAUEAQQAQKSAAQSBBABApIABBHEEAECkgAEEEEC1BAXEEfyAB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IAFBABAoQcAAcUEARwsLCyEDDAILIAFFDQAMAQsgCkEAIAgQayIBECkgAUUNAgsgACANEPoBQQBIDQYgAEEAECgQWCIQQgBTDQYgAUHIACAQECwgA0UEQCABQQxqIgNBACADQQAQMUF3cRAuIAAgAUGAAhB7QQBIDQcgACANIAQQiwEiDUIAUQ0HIABBABAoIA1BABBLQQBIDQUgACABQSAQKhDnAkEASA0HDAELIAtBABAoIgIEQEEAIQMFIAAgACANQQhBABDUASIDRQ0HIAMhAgsgA0UhCCAAIAIgARDsAkEASA0DIAhFBEAgAxA+CwsgDiENDAELCyAEIgIEQCACQQBBDhApIAJBBEEAECkLDAMLIAgNAiADED4MAgsgAEEAEChBDGohAiAEBEAgBEEAIAJBABAoECkgBEEEIAJBBBAoECkLDAELIAAgBiAOEOACQQBIDQAgBhAzIABBABAoEI8DBEAgAEEAEChBDGohAiAERQ0CIARBACACQQAQKBApIARBBCACQQQQKBApDAILIAdBABAoEOEBDAYLIAYQMwsgB0EAECgQ4QEgAEEAECgQngEgBSQFQX8PCyAGEDMLIABBCGoiAARAIABBAEEUECkgAEEEQQAQKQsMAQsgBhAzCyAFJAVBfw8LIAAQjgEgBSQFQQALGgBB2KIBQQBCABA6QeCiAUEAQQAQKUHYogELIwEBfiAAIAEgAhCGASIEQgBTBEBBfw8LIAAgBCACIAMQnQELPQEBfyAAQSQQKEEBRyACQgBTcgR+IABBDGoiAwRAIANBAEESECkgA0EEQQAQKQtCfwUgACABIAJBCxBFCwt4AQV/IABBxABqIgJBABAoIQMgAEHMAGohBEEAIQACQAJAA0AgACADTw0BIARBABAoIgUgAEECdGoiBkEAECggAUcEQCAAQQFqIQAMAQsLDAELDwsgBkEAIANBf2pBAnQgBWpBABAoECkgAkEAIAJBABAoQX9qECkLqwEBBX8gAEHEAGoiBUEAECgiBEEBaiIDIABByABqIgZBABAoIgJJBEAgAEHMABAoIQIgBCEABQJAIABBzABqIgNBABAoIAJBCmoiBEECdBBuIgIEQCAGQQAgBBApIANBACACECkgBUEAECgiAEEBaiEDDAELIABBCGoiAARAIABBAEEOECkgAEEEQQAQKQtBfw8LCyAF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XiAEQQBBABApCwsLIAMQSkEADwsgAxBKQX8LKwEBfyAARQRADwsgAEEIECgiAQRAIABBDBAoIAFBA3FBMGoRAwALIAAQMwuTAgICfwR+AkACfkIAIABBABAtQQFxRQ0AGiAAQQgQKiAAQRAQKn0LQhZUDQACfkIAIABBABAtQQFxRQ0AGiAAQRAQKgshBiAAQgQQPRogABBJBEAgAwRAIANBAEEBECkgA0EEQQAQKQtBAA8LIAAQPCEEIAAQPCIFQf//A3EgBEH//wNxRwRAIAMEQCADQQBBExApIANBBEEAECkLQQAPCyAAEEmtIgcgABBJrSIIfCIJIAEgBnwiAVYNACACQQRxRSABIAlRckUNACAFQf//A3GtIAMQwgEiAEUEQEEADwsgAEEsQQAQKyAAQRggBxAsIABBICAIECwgAA8LIAMEQCADQQBBFRApIANBBEEAECkLQQALtQcCB38FfiMFIQcjBUFAayQFIwUjBk4EQEHAABAACwJ+QgAgAUEAEC1BAXFFDQAaIAFBEBAqCyEMIAFCBBA9GiABEDwiBUH//wNxIQYgARA8IghB//8DcSEJIAEQUCIOQgBTBEAgBARAIARBAEEEECkgBEEEQRsQKQtBACEABQJAIA5COHwiDSACIAx8IgxWBEAgBARAIARBAEEVECkgBEEEQQAQKQtBACEADAELAn8CQCAOIAJUDQAgDSACIAFBCBAqfFYNAEEAIQAgAUEIECogDiACfSINVAR/QX8FIAFBECANECxBASEAQQALGiABQQAgABArQQAMAQsgACAOQQAQS0EASAR/IABBDGohACAEBEAgBEEAIABBABAoECkgBEEEIABBBBAoECkLQQAhAAwCBSAAQjggByAEEGoiAQR/QQEFQQAhAAwDCwsLIQAgAUIEED1B048BQQQQTARAIAQEQCAEQQBBFRApIARBBEEAECkLIABFBEBBACEADAILIAEQNkEAIQAMAQsgARBQIQ0gA0EEcUUiA0UEQCANIA58Qgx8IAxSBEAgBARAIARBAEEVECkgBEEEQQAQKQsgAEUEQEEAIQAMAwsgARA2QQAhAAwCCwsgAUIEED0aIAEQSSIKIAYgBUH//wNxQf//A0YbIQUgARBJIgsgCSAIQf//A3FB//8DRhshBiADRQRAIAYgC0YgBSAKRnFFBEAgBARAIARBAEEV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ABAHBwAACFoAAAgaAAAJlAAUB0MAAAh6AAAIOgAACdQAEgcTAAAIagAACCoAAAm0AAAICgAACIoAAAhKAAAJ9AAQBwUAAAhWAAAIFgBACAAAEwczAAAIdgAACDYAAAnMABEHDwAACGYAAAgmAAAJrAAACAYAAAiGAAAIRgAACewAEAcJAAAIXgAACB4AAAmcABQHYwAACH4AAAg+AAAJ3AASBxsAAAhuAAAILgAACbwAAAgOAAAIjgAACE4AAAn8AGAHAAAACFEAAAgRABUIgwASBx8AAAhxAAAIMQAACcIAEAcKAAAIYQAACCEAAAmiAAAIAQAACIEAAAhBAAAJ4gAQBwYAAAhZAAAIGQAACZIAEwc7AAAIeQAACDkAAAnSABEHEQAACGkAAAgpAAAJsgAACAkAAAiJAAAISQAACfIAEAcEAAAIVQAACBUAEAgCARMHKwAACHUAAAg1AAAJygARBw0AAAhlAAAIJQAACaoAAAgFAAAIhQAACEUAAAnqABAHCAAACF0AAAgdAAAJmgAUB1MAAAh9AAAIPQAACdoAEgcXAAAIbQAACC0AAAm6AAAIDQAACI0AAAhNAAAJ+gAQBwMAAAhTAAAIEwAVCMMAEwcjAAAIcwAACDMAAAnGABEHCwAACGMAAAgjAAAJpgAACAMAAAiDAAAIQwAACeYAEAcHAAAIWwAACBsAAAmWABQHQwAACHsAAAg7AAAJ1gASBxMAAAhrAAAIKwAACbYAAAgLAAAIiwAACEsAAAn2ABAHBQAACFcAAAgXAEAIAAATBzMAAAh3AAAINwAACc4AEQcPAAAIZwAACCcAAAmuAAAIBwAACIcAAAhHAAAJ7gAQBwkAAAhfAAAIHwAACZ4AFAdjAAAIfwAACD8AAAneABIHGwAACG8AAAgvAAAJvgAACA8AAAiPAAAITwAACf4AYAcAAAAIUAAACBAAFAhzABIHHwAACHAAAAgwAAAJwQAQBwoAAAhgAAAIIAAACaEAAAgAAAAIgAAACEAAAAnhABAHBgAACFgAAAgYAAAJkQATBzsAAAh4AAAIOAAACdEAEQcRAAAIaAAACCgAAAmxAAAICAAACIgAAAhIAAAJ8QAQBwQAAAhUAAAIFAAVCOMAEwcrAAAIdAAACDQAAAnJABEHDQAACGQAAAgkAAAJqQAACAQAAAiEAAAIRAAACekAEAcIAAAIXAAACBwAAAmZABQHUwAACHwAAAg8AAAJ2QASBxcAAAhsAAAILAAACbkAAAgMAAAIjAAACEwAAAn5ABAHAwAACFIAAAgSABUIowATByMAAAhyAAAIMgAACcUAEQcLAAAIYgAACCIAAAmlAAAIAgAACIIAAAhCAAAJ5QAQBwcAAAhaAAAIGgAACZUAFAdDAAAIegAACDoAAAnVABIHEwAACGoAAAgqAAAJtQAACAoAAAiKAAAISgAACfUAEAcFAAAIVgAACBYAQAgAABMHMwAACHYAAAg2AAAJzQARBw8AAAhmAAAIJgAACa0AAAgGAAAIhgAACEYAAAntABAHCQAACF4AAAgeAAAJnQAUB2MAAAh+AAAIPgAACd0AEgcbAAAIbgAACC4AAAm9AAAIDgAACI4AAAhOAAAJ/QBgBwAAAAhRAAAIEQAVCIMAEgcfAAAIcQAACDEAAAnDABAHCgAACGEAAAghAAAJowAACAEAAAiBAAAIQQAACeMAEAcGAAAIWQAACBkAAAmTABMHOwAACHkAAAg5AAAJ0wARBxEAAAhpAAAIKQAACbMAAAgJAAAIiQAACEkAAAnzABAHBAAACFUAAAgVABAIAgETBysAAAh1AAAINQAACcsAEQcNAAAIZQAACCUAAAmrAAAIBQAACIUAAAhFAAAJ6wAQBwgAAAhdAAAIHQAACZsAFAdTAAAIfQAACD0AAAnbABIHFwAACG0AAAgtAAAJuwAACA0AAAiNAAAITQAACfsAEAcDAAAIUwAACBMAFQjDABMHIwAACHMAAAgzAAAJxwARBwsAAAhjAAAIIwAACacAAAgDAAAIgwAACEMAAAnnABAHBwAACFsAAAgbAAAJlwAUB0MAAAh7AAAIOwAACdcAEgcTAAAIawAACCsAAAm3AAAICwAACIsAAAhLAAAJ9wAQBwUAAAhXAAAIFwBACAAAEwczAAAIdwAACDcAAAnPABEHDwAACGcAAAgnAAAJrwAACAcAAAiHAAAIRwAACe8AEAcJAAAIXwAACB8AAAmfABQHYwAACH8AAAg/AAAJ3wASBxsAAAhvAAAILwAACb8AAAgPAAAIjwAACE8AAAn/ABAFAQAXBQEBEwURABsFARARBQUAGQUBBBUFQQAdBQFAEAUDABgFAQIUBSEAHAUBIBIFCQAaBQEIFgWBAEAFAAAQBQIAFwWB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eSB1bmF2YWlsYWJsZQBJbnZhbGlkIHNlZWsAQ3Jvc3MtZGV2aWNlIGxpbmsAUmVhZC1vbmx5IGZpbGUgc3lzdGVtAERpcmVjdG9yeSBub3QgZW1wdHkAQ29ubmVjdGlvbiByZXNldCBieSBwZWVyAE9wZXJhdGlvbiB0aW1lZCBvdXQAQ29ubmVjdGlvbiByZWZ1c2VkAEhvc3QgaXMgZG93bgBIb3N0IGlzIHVucmVhY2hhYmxlAEFkZHJlc3MgaW4gdXNlAEJyb2tlbiBwaXBlAEkvTyBlcnJvcgBObyBzdWNoIGRldmljZSBvciBhZGRyZXNzAEJsb2NrIGRldmljZSByZXF1aXJlZABObyBzdWNoIGRldmljZQBOb3QgYSBkaXJlY3RvcnkASXMgYSBkaXJlY3RvcnkAVGV4dCBmaWxlIGJ1c3kARXhlYyBmb3JtYXQgZXJyb3IASW52YWxpZCBhcmd1bWVudABBcmd1bWVudCBsaXN0IHRvbyBsb25nAFN5bWJvbGljIGxpbmsgbG9vcABGaWxlbmFtZSB0b28gbG9uZwBUb28gbWFueSBvcGVuIGZpbGVzIGluIHN5c3RlbQBObyBmaWxlIGRlc2NyaXB0b3JzIGF2YWlsYWJsZQBCYWQgZmlsZSBkZXNjcmlwdG9yAE5vIGNoaWxkIHByb2Nlc3MAQmFkIGFkZHJlc3MARmlsZSB0b28gbGFyZ2UAVG9vIG1hbnkgbGlua3MATm8gbG9ja3MgYXZhaWxhYmxlAFJlc291cmNlIGRlYWRsb2NrIHdvdWxkIG9jY3VyAFN0YXRlIG5vdCByZWNvdmVyYWJsZQBQcmV2aW91cyBvd25lciBkaWVkAE9wZXJhdGlvbiBjYW5jZWxlZABGdW5jdGlvbiBub3QgaW1wbGVtZW50ZWQATm8gbWVzc2FnZSBvZiBkZXNpcmVkIHR5cGUASWRlbnRpZmllciByZW1vdmVkAERldmljZSBub3QgYSBzdHJlYW0ATm8gZGF0YSBhdmFpbGFibGUARGV2aWNlIHRpbWVvdXQAT3V0IG9mIHN0cmVhbXMgcmVzb3VyY2VzAExpbmsgaGFzIGJlZW4gc2V2ZXJlZABQcm90b2NvbCBlcnJvcgBCYWQgbWVzc2FnZQBGaWxlIGRlc2NyaXB0b3IgaW4gYmFkIHN0YXRlAE5vdCBhIHNvY2tldABEZXN0aW5hdGlvbiBhZGRyZXNzIHJlcXVpcmVkAE1lc3NhZ2UgdG9vIGxhcmdlAFByb3RvY29sIHdyb25nIHR5cGUgZm9yIHNvY2tldABQcm90b2NvbCBub3QgYXZhaWxhYmxlAFByb3RvY29sIG5vdCBzdXBwb3J0ZWQAU29ja2V0IHR5cGUgbm90IHN1cHBvcnRlZABOb3Qgc3VwcG9ydGVkAFByb3RvY29sIGZhbWlseSBub3Qgc3VwcG9ydGVkAEFkZHJlc3MgZmFtaWx5IG5vdCBzdXBwb3J0ZWQgYnkgcHJvdG9jb2wAQWRkcmVzcyBub3QgYXZhaWxhYmxlAE5ldHdvcmsgaXMgZG93bgBOZXR3b3JrIHVucmVhY2hhYmxlAENvbm5lY3Rpb24gcmVzZXQgYnkgbmV0d29yawBDb25uZWN0aW9uIGFib3J0ZWQATm8gYnVmZmVyIHNwYWNlIGF2YWlsYWJsZQBTb2NrZXQgaXMgY29ubmVjdGVkAFNvY2tldCBub3QgY29ubmVjdGVkAENhbm5vdCBzZW5kIGFmdGVyIHNvY2tldCBzaHV0ZG93bgBPcGVyYXRpb24gYWxyZWFkeSBpbiBwcm9ncmVzcwBPcGVyYXRpb24gaW4gcHJvZ3Jlc3MAU3RhbGUgZmlsZSBoYW5kbGUAUmVtb3RlIEkvTyBlcnJvcgBRdW90YSBleGNlZWRlZABObyBtZWRpdW0gZm91bmQAV3JvbmcgbWVkaXVtIHR5cGUATm8gZXJyb3IgaW5mb3JtYXRpb24AAAAAAAD/////////////////////AQAAAAEAAAABAAAAAgAAAAMAAAABAAAAAgAAAAIAAAADAAAAAQAAAAEAAAACAAAAAwAAAAEAAAACAAAAAgAAAIA1AAAAOgAAAQEAAB4BAAAPAAAAgDQAAAA1AAAAAAAAHgAAAA8AAAAAAAAAMDQAAAAAAAATAAAABwAAAAUAQbiLAQsBBABB0IsBCw4EAAAABQAAABhNAAAABABB6IsBCwEBAEH3iwELBQr/////AEGojAELAqxFAEHojQELAnxTAEHEjgELAQYAQeuOAQsF//////8AQZyPAQvyCkFFAFBLAwQAUEsBAgBVbmtub3duIGVycm9yICVkADogACVzJXMlcwBQSwcIAFBLBQYAUEsGBwBQSwYGAE5vIGVycm9yAE11bHRpLWRpc2sgemlwIGFyY2hpdmVzIG5vdCBzdXBwb3J0ZWQAUmVuYW1pbmcgdGVtcG9yYXJ5IGZpbGUgZmFpbGVkAENsb3NpbmcgemlwIGFyY2hpdmUgZmFpbGVkAFNlZWsgZXJyb3IAUmVhZCBlcnJvcgBXcml0ZSBlcnJvcgBDUkMgZXJyb3IAQ29udGFpbmluZyB6aXAgYXJjaGl2ZSB3YXMgY2xvc2VkAE5vIHN1Y2ggZmlsZQBGaWxlIGFscmVhZHkgZXhpc3RzAENhbid0IG9wZW4gZmlsZQBGYWlsdXJlIHRvIGNyZWF0ZSB0ZW1wb3JhcnkgZmlsZQBabGliIGVycm9yAE1hbGxvYyBmYWlsdXJlAEVudHJ5IGhhcyBiZWVuIGNoYW5nZWQAQ29tcHJlc3Npb24gbWV0aG9kIG5vdCBzdXBwb3J0ZWQAUHJlbWF0dXJlIGVuZCBvZiBmaWxlAEludmFsaWQgYXJndW1lbnQATm90IGEgemlwIGFyY2hpdmUASW50ZXJuYWwgZXJyb3IAWmlwIGFyY2hpdmUgaW5jb25zaXN0ZW50AENhbid0IHJlbW92ZSBmaWxlAEVudHJ5IGhhcyBiZWVuIGRlbGV0ZWQARW5jcnlwdGlvbiBtZXRob2Qgbm90IHN1cHBvcnRlZABSZWFkLW9ubHkgYXJjaGl2ZQBObyBwYXNzd29yZCBwcm92aWRlZABXcm9uZyBwYXNzd29yZCBwcm92aWRlZABPcGVyYXRpb24gbm90IHN1cHBvcnRlZABSZXNvdXJjZSBzdGlsbCBpbiB1c2UAVGVsbCBlcnJvcgBDb21wcmVzc2VkIGRhdGEgaW52YWxpZAByYgAlcy5YWFhYWFgAcitiAGluY29ycmVjdCBoZWFkZXIgY2hlY2sAdW5rbm93biBjb21wcmVzc2lvbiBtZXRob2QAaW52YWxpZCB3aW5kb3cgc2l6ZQB1bmtub3duIGhlYWRlciBmbGFncyBzZXQAaGVhZGVyIGNyYyBtaXNtYXRjaABpbnZhbGlkIGJsb2NrIHR5cGUAaW52YWxpZCBzdG9yZWQgYmxvY2sgbGVuZ3RocwB0b28gbWFueSBsZW5ndGggb3IgZGlzdGFuY2Ugc3ltYm9scwBpbnZhbGlkIGNvZGUgbGVuZ3RocyBzZXQAaW52YWxpZCBiaXQgbGVuZ3RoIHJlcGVhdABpbnZhbGlkIGNvZGUgLS0gbWlzc2luZyBlbmQtb2YtYmxvY2sAaW52YWxpZCBsaXRlcmFsL2xlbmd0aHMgc2V0AGludmFsaWQgZGlzdGFuY2VzIHNldABpbmNvcnJlY3QgZGF0YSBjaGVjawBpbmNvcnJlY3QgbGVuZ3RoIGNoZWNrAGludmFsaWQgZGlzdGFuY2UgdG9vIGZhciBiYWNrAGludmFsaWQgZGlzdGFuY2UgY29kZQBpbnZhbGlkIGxpdGVyYWwvbGVuZ3RoIGNvZGUAbmVlZCBkaWN0aW9uYXJ5AHN0cmVhbSBlbmQAZmlsZSBlcnJvcgBzdHJlYW0gZXJyb3IAZGF0YSBlcnJvcgBpbnN1ZmZpY2llbnQgbWVtb3J5AGJ1ZmZlciBlcnJvcgBpbmNvbXBhdGlibGUgdmVyc2lvbgByd2EALSsgICAwWDB4AChudWxsKQAtMFgrMFggMFgtMHgrMHggMHgAaW5mAElORgBuYW4ATkFOAC4AL3Byb2Mvc2VsZi9mZC8AWFhYWFhY";if(!isDataURI(wasmBinaryFile)){wasmBinaryFile=locateFile(wasmBinaryFile)}var wasmPageSize=64*1024;var info={"global":null,"env":null,"asm2wasm":asm2wasmImports,"parent":Module};var exports=null;function mergeMemory(newBuffer){var oldBuffer=Module["buffer"];if(newBuffer.byteLength<oldBuffer.byteLength){err("the new buffer in mergeMemory is smaller than the previous one. in native wasm, we should grow memory here")}var oldView=new Int8Array(oldBuffer);var newView=new Int8Array(newBuffer);newView.set(oldView);updateGlobalBuffer(newBuffer);updateGlobalBufferViews()}function getBinary(){try{if(Module["wasmBinary"]){return new Uint8Array(Module["wasmBinary"])}var binary=tryParseAsDataURI(wasmBinaryFile);if(binary){return binary}if(Module["readBinary"]){return Module["readBinary"](wasmBinaryFile)}else{throw"sync fetching of the wasm failed: you can preload it to Module['wasmBinary'] manually, or emcc.py will do that for you when generating HTML (but not JS)"}}catch(err){abort(err)}}function createWasm(global,env,providedBuffer){if(typeof WebAssembly!=="object"){abort("No WebAssembly support found. Build with -s WASM=0 to target JavaScript instead.");err("no native wasm support detected");return false}if(!(Module["wasmMemory"]instanceof WebAssembly.Memory)){err("no native wasm Memory in use");return false}env["memory"]=Module["wasmMemory"];info["global"]={"NaN":NaN,"Infinity":Infinity};info["global.Math"]=Math;info["env"]=env;function receiveInstance(instance,module){exports=instance.exports;if(exports.memory)mergeMemory(exports.memory);Module["asm"]=exports;removeRunDependency("wasm-instantiate")}addRunDependency("wasm-instantiate");if(Module["instantiateWasm"]){try{return Module["instantiateWasm"](info,receiveInstance)}catch(e){err("Module.instantiateWasm callback failed with error: "+e);return false}}var instance;var module;try{module=new WebAssembly.Module(getBinary());instance=new WebAssembly.Instance(module,info)}catch(e){err("failed to compile wasm module: "+e);if(e.toString().indexOf("imported Memory with incompatible size")>=0){err("Memory size incompatibility issues may be due to changing TOTAL_MEMORY at runtime to something too large. Use ALLOW_MEMORY_GROWTH to allow any size memory (and also make sure not to set TOTAL_MEMORY at runtime to something smaller than it was at compile time).")}return false}receiveInstance(instance,module);return exports}Module["asmPreload"]=Module["asm"];var wasmReallocBuffer=(function(size){var PAGE_MULTIPLE=65536;size=alignUp(size,PAGE_MULTIPLE);var old=Module["buffer"];var oldSize=old.byteLength;try{var result=Module["wasmMemory"].grow((size-oldSize)/wasmPageSize);if(result!==(-1|0)){return Module["buffer"]=Module["wasmMemory"].buffer}else{return null}}catch(e){console.error("Module.reallocBuffer: Attempted to grow from "+oldSize+" bytes to "+size+" bytes, but got error: "+e);return null}});Module["reallocBuffer"]=(function(size){return wasmReallocBuffer(size)});Module["asm"]=(function(global,env,providedBuffer){if(!env["table"]){assert(Module["wasmTableSize"]!==undefined);var TABLE_SIZE=Module["wasmTableSize"];var MAX_TABLE_SIZE=Module["wasmMaxTableSize"];if(typeof WebAssembly==="object"&&typeof WebAssembly.Table==="function"){if(MAX_TABLE_SIZE!==undefined){env["table"]=new WebAssembly.Table({"initial":TABLE_SIZE,"maximum":MAX_TABLE_SIZE,"element":"anyfunc"})}else{env["table"]=new WebAssembly.Table({"initial":TABLE_SIZE,element:"anyfunc"})}}else{env["table"]=new Array(TABLE_SIZE)}Module["wasmTable"]=env["table"]}if(!env["__memory_base"]){env["__memory_base"]=Module["STATIC_BASE"]}if(!env["__table_base"]){env["__table_base"]=0}var exports=createWasm(global,env,providedBuffer);assert(exports,"binaryen setup failed (no wasm support?)");return exports})}integrateWasmJS();STATIC_BASE=GLOBAL_BASE;__ATINIT__.push({func:(function(){___emscripten_environ_constructor()})});var STATIC_BUMP=21696;Module["STATIC_BASE"]=STATIC_BASE;Module["STATIC_BUMP"]=STATIC_BUMP;var tempDoublePtr=22704;assert(tempDoublePtr%8==0);var ENV={};function ___buildEnvironment(environ){var MAX_ENV_VALUES=64;var TOTAL_ENV_SIZE=1024;var poolPtr;var envPtr;if(!___buildEnvironment.called){___buildEnvironment.called=true;ENV["USER"]=ENV["LOGNAME"]="web_user";ENV["PATH"]="/";ENV["PWD"]="/";ENV["HOME"]="/home/web_user";ENV["LANG"]="C.UTF-8";ENV["_"]=Module["thisProgram"];poolPtr=getMemory(TOTAL_ENV_SIZE);envPtr=getMemory(MAX_ENV_VALUES*4);SAFE_HEAP_STORE(envPtr|0,poolPtr|0,4);SAFE_HEAP_STORE(environ|0,envPtr|0,4)}else{envPtr=SAFE_HEAP_LOAD(environ|0,4,0)|0;poolPtr=SAFE_HEAP_LOAD(envPtr|0,4,0)|0}var strings=[];var totalSize=0;for(var key in ENV){if(typeof ENV[key]==="string"){var line=key+"="+ENV[key];strings.push(line);totalSize+=line.length}}if(totalSize>TOTAL_ENV_SIZE){throw new Error("Environment size exceeded TOTAL_ENV_SIZE!")}var ptrSize=4;for(var i=0;i<strings.length;i++){var line=strings[i];writeAsciiToMemory(line,poolPtr);SAFE_HEAP_STORE(envPtr+i*ptrSize|0,poolPtr|0,4);poolPtr+=line.length+1}SAFE_HEAP_STORE(envPtr+strings.length*ptrSize|0,0|0,4)}function _emscripten_get_now(){abort()}function _emscripten_get_now_is_monotonic(){return ENVIRONMENT_IS_NODE||typeof dateNow!=="undefined"||(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER)&&self["performance"]&&self["performance"]["now"]}function ___setErrNo(value){if(Module["___errno_location"])SAFE_HEAP_STORE(Module["___errno_location"]()|0,value|0,4);else err("failed to set errno from JS");return value}function _clock_gettime(clk_id,tp){var now;if(clk_id===0){now=Date.now()}else if(clk_id===1&&_emscripten_get_now_is_monotonic()){now=_emscripten_get_now()}else{___setErrNo(22);return-1}SAFE_HEAP_STORE(tp|0,now/1e3|0|0,4);SAFE_HEAP_STORE(tp+4|0,now%1e3*1e3*1e3|0|0,4);return 0}function ___clock_gettime(){return _clock_gettime.apply(null,arguments)}function ___lock(){}var PATH={splitPath:(function(filename){var splitPathRe=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;return splitPathRe.exec(filename).slice(1)}),normalizeArray:(function(parts,allowAboveRoot){var up=0;for(var i=parts.length-1;i>=0;i--){var last=parts[i];if(last==="."){parts.splice(i,1)}else if(last===".."){parts.splice(i,1);up++}else if(up){parts.splice(i,1);up--}}if(allowAboveRoot){for(;up;up--){parts.unshift("..")}}return parts}),normalize:(function(path){var isAbsolute=path.charAt(0)==="/",trailingSlash=path.substr(-1)==="/";path=PATH.normalizeArray(path.split("/").filter((function(p){return!!p})),!isAbsolute).join("/");if(!path&&!isAbsolute){path="."}if(path&&trailingSlash){path+="/"}return(isAbsolute?"/":"")+path}),dirname:(function(path){var result=PATH.splitPath(path),root=result[0],dir=result[1];if(!root&&!dir){return"."}if(dir){dir=dir.substr(0,dir.length-1)}return root+dir}),basename:(function(path){if(path==="/")return"/";var lastSlash=path.lastIndexOf("/");if(lastSlash===-1)return path;return path.substr(lastSlash+1)}),extname:(function(path){return PATH.splitPath(path)[3]}),join:(function(){var paths=Array.prototype.slice.call(arguments,0);return PATH.normalize(paths.join("/"))}),join2:(function(l,r){return PATH.normalize(l+"/"+r)}),resolve:(function(){var resolvedPath="",resolvedAbsolute=false;for(var i=arguments.length-1;i>=-1&&!resolvedAbsolute;i--){var path=i>=0?arguments[i]:FS.cwd();if(typeof path!=="string"){throw new TypeError("Arguments to path.resolve must be strings")}else if(!path){return""}resolvedPath=path+"/"+resolvedPath;resolvedAbsolute=path.charAt(0)==="/"}resolvedPath=PATH.normalizeArray(resolvedPath.split("/").filter((function(p){return!!p})),!resolvedAbsolute).join("/");return(resolvedAbsolute?"/":"")+resolvedPath||"."}),relative:(function(from,to){from=PATH.resolve(from).substr(1);to=PATH.resolve(to).substr(1);function trim(arr){var start=0;for(;start<arr.length;start++){if(arr[start]!=="")break}var end=arr.length-1;for(;end>=0;end--){if(arr[end]!=="")break}if(start>end)return[];return arr.slice(start,end-start+1)}var fromParts=trim(from.split("/"));var toParts=trim(to.split("/"));var length=Math.min(fromParts.length,toParts.length);var samePartsLength=length;for(var i=0;i<length;i++){if(fromParts[i]!==toParts[i]){samePartsLength=i;break}}var outputParts=[];for(var i=samePartsLength;i<fromParts.length;i++){outputParts.push("..")}outputParts=outputParts.concat(toParts.slice(samePartsLength));return outputParts.join("/")})};var TTY={ttys:[],init:(function(){}),shutdown:(function(){}),register:(function(dev,ops){TTY.ttys[dev]={input:[],output:[],ops:ops};FS.registerDevice(dev,TTY.stream_ops)}),stream_ops:{open:(function(stream){var tty=TTY.ttys[stream.node.rdev];if(!tty){throw new FS.ErrnoError(ERRNO_CODES.ENODEV)}stream.tty=tty;stream.seekable=false}),close:(function(stream){stream.tty.ops.flush(stream.tty)}),flush:(function(stream){stream.tty.ops.flush(stream.tty)}),read:(function(stream,buffer,offset,length,pos){if(!stream.tty||!stream.tty.ops.get_char){throw new FS.ErrnoError(ERRNO_CODES.ENXIO)}var bytesRead=0;for(var i=0;i<length;i++){var result;try{result=stream.tty.ops.get_char(stream.tty)}catch(e){throw new FS.ErrnoError(ERRNO_CODES.EIO)}if(result===undefined&&bytesRead===0){throw new FS.ErrnoError(ERRNO_CODES.EAGAIN)}if(result===null||result===undefined)break;bytesRead++;buffer[offset+i]=result}if(bytesRead){stream.node.timestamp=Date.now()}return bytesRead}),write:(function(stream,buffer,offset,length,pos){if(!stream.tty||!stream.tty.ops.put_char){throw new FS.ErrnoError(ERRNO_CODES.ENXIO)}try{for(var i=0;i<length;i++){stream.tty.ops.put_char(stream.tty,buffer[offset+i])}}catch(e){throw new FS.ErrnoError(ERRNO_CODES.EIO)}if(length){stream.node.timestamp=Date.now()}return i})},default_tty_ops:{get_char:(function(tty){if(!tty.input.length){var result=null;if(ENVIRONMENT_IS_NODE){var BUFSIZE=256;var buf=new Buffer(BUFSIZE);var bytesRead=0;var isPosixPlatform=process.platform!="win32";var fd=process.stdin.fd;if(isPosixPlatform){var usingDevice=false;try{fd=fs.openSync("/dev/stdin","r");usingDevice=true}catch(e){}}try{bytesRead=fs.readSync(fd,buf,0,BUFSIZE,null)}catch(e){if(e.toString().indexOf("EOF")!=-1)bytesRead=0;else throw e}if(usingDevice){fs.closeSync(fd)}if(bytesRead>0){result=buf.slice(0,bytesRead).toString("utf-8")}else{result=null}}else if(typeof window!="undefined"&&typeof window.prompt=="function"){result=window.prompt("Input: ");if(result!==null){result+="\n"}}else if(typeof readline=="function"){result=readline();if(result!==null){result+="\n"}}if(!result){return null}tty.input=intArrayFromString(result,true)}return tty.input.shift()}),put_char:(function(tty,val){if(val===null||val===10){out(UTF8ArrayToString(tty.output,0));tty.output=[]}else{if(val!=0)tty.output.push(val)}}),flush:(function(tty){if(tty.output&&tty.output.length>0){out(UTF8ArrayToString(tty.output,0));tty.output=[]}})},default_tty1_ops:{put_char:(function(tty,val){if(val===null||val===10){err(UTF8ArrayToString(tty.output,0));tty.output=[]}else{if(val!=0)tty.output.push(val)}}),flush:(function(tty){if(tty.output&&tty.output.length>0){err(UTF8ArrayToString(tty.output,0));tty.output=[]}})}};var MEMFS={ops_table:null,mount:(function(mount){return MEMFS.createNode(null,"/",16384|511,0)}),createNode:(function(parent,name,mode,dev){if(FS.isBlkdev(mode)||FS.isFIFO(mode)){throw new FS.ErrnoError(ERRNO_CODES.EPERM)}if(!MEMFS.ops_table){MEMFS.ops_table={dir:{node:{getattr:MEMFS.node_ops.getattr,setattr:MEMFS.node_ops.setattr,lookup:MEMFS.node_ops.lookup,mknod:MEMFS.node_ops.mknod,rename:MEMFS.node_ops.rename,unlink:MEMFS.node_ops.unlink,rmdir:MEMFS.node_ops.rmdir,readdir:MEMFS.node_ops.readdir,symlink:MEMFS.node_ops.symlink},stream:{llseek:MEMFS.stream_ops.llseek}},file:{node:{getattr:MEMFS.node_ops.getattr,setattr:MEMFS.node_ops.setattr},stream:{llseek:MEMFS.stream_ops.llseek,read:MEMFS.stream_ops.read,write:MEMFS.stream_ops.write,allocate:MEMFS.stream_ops.allocate,mmap:MEMFS.stream_ops.mmap,msync:MEMFS.stream_ops.msync}},link:{node:{getattr:MEMFS.node_ops.getattr,setattr:MEMFS.node_ops.setattr,readlink:MEMFS.node_ops.readlink},stream:{}},chrdev:{node:{getattr:MEMFS.node_ops.getattr,setattr:MEMFS.node_ops.setattr},stream:FS.chrdev_stream_ops}}}var node=FS.createNode(parent,name,mode,dev);if(FS.isDir(node.mode)){node.node_ops=MEMFS.ops_table.dir.node;node.stream_ops=MEMFS.ops_table.dir.stream;node.contents={}}else if(FS.isFile(node.mode)){node.node_ops=MEMFS.ops_table.file.node;node.stream_ops=MEMFS.ops_table.file.stream;node.usedBytes=0;node.contents=null}else if(FS.isLink(node.mode)){node.node_ops=MEMFS.ops_table.link.node;node.stream_ops=MEMFS.ops_table.link.stream}else if(FS.isChrdev(node.mode)){node.node_ops=MEMFS.ops_table.chrdev.node;node.stream_ops=MEMFS.ops_table.chrdev.stream}node.timestamp=Date.now();if(parent){parent.contents[name]=node}return node}),getFileDataAsRegularArray:(function(node){if(node.contents&&node.contents.subarray){var arr=[];for(var i=0;i<node.usedBytes;++i)arr.push(node.contents[i]);return arr}return node.contents}),getFileDataAsTypedArray:(function(node){if(!node.contents)return new Uint8Array;if(node.contents.subarray)return node.contents.subarray(0,node.usedBytes);return new Uint8Array(node.contents)}),expandFileStorage:(function(node,newCapacity){if(node.contents&&node.contents.subarray&&newCapacity>node.contents.length){node.contents=MEMFS.getFileDataAsRegularArray(node);node.usedBytes=node.contents.length}if(!node.contents||node.contents.subarray){var prevCapacity=node.contents?node.contents.length:0;if(prevCapacity>=newCapacity)return;var CAPACITY_DOUBLING_MAX=1024*1024;newCapacity=Math.max(newCapacity,prevCapacity*(prevCapacity<CAPACITY_DOUBLING_MAX?2:1.125)|0);if(prevCapacity!=0)newCapacity=Math.max(newCapacity,256);var oldContents=node.contents;node.contents=new Uint8Array(newCapacity);if(node.usedBytes>0)node.contents.set(oldContents.subarray(0,node.usedBytes),0);return}if(!node.contents&&newCapacity>0)node.contents=[];while(node.contents.length<newCapacity)node.contents.push(0)}),resizeFileStorage:(function(node,newSize){if(node.usedBytes==newSize)return;if(newSize==0){node.contents=null;node.usedBytes=0;return}if(!node.contents||node.contents.subarray){var oldContents=node.contents;node.contents=new Uint8Array(new ArrayBuffer(newSize));if(oldContents){node.contents.set(oldContents.subarray(0,Math.min(newSize,node.usedBytes)))}node.usedBytes=newSize;return}if(!node.contents)node.contents=[];if(node.contents.length>newSize)node.contents.length=newSize;else while(node.contents.length<newSize)node.contents.push(0);node.usedBytes=newSize}),node_ops:{getattr:(function(node){var attr={};attr.dev=FS.isChrdev(node.mode)?node.id:1;attr.ino=node.id;attr.mode=node.mode;attr.nlink=1;attr.uid=0;attr.gid=0;attr.rdev=node.rdev;if(FS.isDir(node.mode)){attr.size=4096}else if(FS.isFile(node.mode)){attr.size=node.usedBytes}else if(FS.isLink(node.mode)){attr.size=node.link.length}else{attr.size=0}attr.atime=new Date(node.timestamp);attr.mtime=new Date(node.timestamp);attr.ctime=new Date(node.timestamp);attr.blksize=4096;attr.blocks=Math.ceil(attr.size/attr.blksize);return attr}),setattr:(function(node,attr){if(attr.mode!==undefined){node.mode=attr.mode}if(attr.timestamp!==undefined){node.timestamp=attr.timestamp}if(attr.size!==undefined){MEMFS.resizeFileStorage(node,attr.size)}}),lookup:(function(parent,name){throw FS.genericErrors[ERRNO_CODES.ENOENT]}),mknod:(function(parent,name,mode,dev){return MEMFS.createNode(parent,name,mode,dev)}),rename:(function(old_node,new_dir,new_name){if(FS.isDir(old_node.mode)){var new_node;try{new_node=FS.lookupNode(new_dir,new_name)}catch(e){}if(new_node){for(var i in new_node.contents){throw new FS.ErrnoError(ERRNO_CODES.ENOTEMPTY)}}}delete old_node.parent.contents[old_node.name];old_node.name=new_name;new_dir.contents[new_name]=old_node;old_node.parent=new_dir}),unlink:(function(parent,name){delete parent.contents[name]}),rmdir:(function(parent,name){var node=FS.lookupNode(parent,name);for(var i in node.contents){throw new FS.ErrnoError(ERRNO_CODES.ENOTEMPTY)}delete parent.contents[name]}),readdir:(function(node){var entries=[".",".."];for(var key in node.contents){if(!node.contents.hasOwnProperty(key)){continue}entries.push(key)}return entries}),symlink:(function(parent,newname,oldpath){var node=MEMFS.createNode(parent,newname,511|40960,0);node.link=oldpath;return node}),readlink:(function(node){if(!FS.isLink(node.mode)){throw new FS.ErrnoError(ERRNO_CODES.EINVAL)}return node.link})},stream_ops:{read:(function(stream,buffer,offset,length,position){var contents=stream.node.contents;if(position>=stream.node.usedBytes)return 0;var size=Math.min(stream.node.usedBytes-position,length);assert(size>=0);if(size>8&&contents.subarray){buffer.set(contents.subarray(position,position+size),offset)}else{for(var i=0;i<size;i++)buffer[offset+i]=contents[position+i]}return size}),write:(function(stream,buffer,offset,length,position,canOwn){if(canOwn){warnOnce("file packager has copied file data into memory, but in memory growth we are forced to copy it again (see --no-heap-copy)")}canOwn=false;if(!length)return 0;var node=stream.node;node.timestamp=Date.now();if(buffer.subarray&&(!node.contents||node.contents.subarray)){if(canOwn){assert(position===0,"canOwn must imply no weird position inside the file");node.contents=buffer.subarray(offset,offset+length);node.usedBytes=length;return length}else if(node.usedBytes===0&&position===0){node.contents=new Uint8Array(buffer.subarray(offset,offset+length));node.usedBytes=length;return length}else if(position+length<=node.usedBytes){node.contents.set(buffer.subarray(offset,offset+length),position);return length}}MEMFS.expandFileStorage(node,position+length);if(node.contents.subarray&&buffer.subarray)node.contents.set(buffer.subarray(offset,offset+length),position);else{for(var i=0;i<length;i++){node.contents[position+i]=buffer[offset+i]}}node.usedBytes=Math.max(node.usedBytes,position+length);return length}),llseek:(function(stream,offset,whence){var position=offset;if(whence===1){position+=stream.position}else if(whence===2){if(FS.isFile(stream.node.mode)){position+=stream.node.usedBytes}}if(position<0){throw new FS.ErrnoError(ERRNO_CODES.EINVAL)}return position}),allocate:(function(stream,offset,length){MEMFS.expandFileStorage(stream.node,offset+length);stream.node.usedBytes=Math.max(stream.node.usedBytes,offset+length)}),mmap:(function(stream,buffer,offset,length,position,prot,flags){if(!FS.isFile(stream.node.mode)){throw new FS.ErrnoError(ERRNO_CODES.ENODEV)}var ptr;var allocated;var contents=stream.node.contents;if(!(flags&2)&&(contents.buffer===buffer||contents.buffer===buffer.buffer)){allocated=false;ptr=contents.byteOffset}else{if(position>0||position+length<stream.node.usedBytes){if(contents.subarray){contents=contents.subarray(position,position+length)}else{contents=Array.prototype.slice.call(contents,position,position+length)}}allocated=true;ptr=_malloc(length);if(!ptr){throw new FS.ErrnoError(ERRNO_CODES.ENOMEM)}buffer.set(contents,ptr)}return{ptr:ptr,allocated:allocated}}),msync:(function(stream,buffer,offset,length,mmapFlags){if(!FS.isFile(stream.node.mode)){throw new FS.ErrnoError(ERRNO_CODES.ENODEV)}if(mmapFlags&2){return 0}var bytesWritten=MEMFS.stream_ops.write(stream,buffer,0,length,offset,false);return 0})}};var NODEFS={isWindows:false,staticInit:(function(){NODEFS.isWindows=!!process.platform.match(/^win/);var flags=process["binding"]("constants");if(flags["fs"]){flags=flags["fs"]}NODEFS.flagsForNodeMap={"1024":flags["O_APPEND"],"64":flags["O_CREAT"],"128":flags["O_EXCL"],"0":flags["O_RDONLY"],"2":flags["O_RDWR"],"4096":flags["O_SYNC"],"512":flags["O_TRUNC"],"1":flags["O_WRONLY"]}}),bufferFrom:(function(arrayBuffer){return Buffer.alloc?Buffer.from(arrayBuffer):new Buffer(arrayBuffer)}),mount:(function(mount){assert(ENVIRONMENT_IS_NODE);return NODEFS.createNode(null,"/",NODEFS.getMode(mount.opts.root),0)}),createNode:(function(parent,name,mode,dev){if(!FS.isDir(mode)&&!FS.isFile(mode)&&!FS.isLink(mode)){throw new FS.ErrnoError(ERRNO_CODES.EINVAL)}var node=FS.createNode(parent,name,mode);node.node_ops=NODEFS.node_ops;node.stream_ops=NODEFS.stream_ops;return node}),getMode:(function(path){var stat;try{stat=fs.lstatSync(path);if(NODEFS.isWindows){stat.mode=stat.mode|(stat.mode&292)>>2}}catch(e){if(!e.code)throw e;throw new FS.ErrnoError(ERRNO_CODES[e.code])}return stat.mode}),realPath:(function(node){var parts=[];while(node.parent!==node){parts.push(node.name);node=node.parent}parts.push(node.mount.opts.root);parts.reverse();return PATH.join.apply(null,parts)}),flagsForNode:(function(flags){flags&=~2097152;flags&=~2048;flags&=~32768;flags&=~524288;var newFlags=0;for(var k in NODEFS.flagsForNodeMap){if(flags&k){newFlags|=NODEFS.flagsForNodeMap[k];flags^=k}}if(!flags){return newFlags}else{throw new FS.ErrnoError(ERRNO_CODES.EINVAL)}}),node_ops:{getattr:(function(node){var path=NODEFS.realPath(node);var stat;try{stat=fs.lstatSync(path)}catch(e){if(!e.code)throw e;throw new FS.ErrnoError(ERRNO_CODES[e.code])}if(NODEFS.isWindows&&!stat.blksize){stat.blksize=4096}if(NODEFS.isWindows&&!stat.blocks){stat.blocks=(stat.size+stat.blksize-1)/stat.blksize|0}return{dev:stat.dev,ino:stat.ino,mode:stat.mode,nlink:stat.nlink,uid:stat.uid,gid:stat.gid,rdev:stat.rdev,size:stat.size,atime:stat.atime,mtime:stat.mtime,ctime:stat.ctime,blksize:stat.blksize,blocks:stat.blocks}}),setattr:(function(node,attr){var path=NODEFS.realPath(node);try{if(attr.mode!==undefined){fs.chmodSync(path,attr.mode);node.mode=attr.mode}if(attr.timestamp!==undefined){var date=new Date(attr.timestamp);fs.utimesSync(path,date,date)}if(attr.size!==undefined){fs.truncateSync(path,attr.size)}}catch(e){if(!e.code)throw e;throw new FS.ErrnoError(ERRNO_CODES[e.code])}}),lookup:(function(parent,name){var path=PATH.join2(NODEFS.realPath(parent),name);var mode=NODEFS.getMode(path);return NODEFS.createNode(parent,name,mode)}),mknod:(function(parent,name,mode,dev){var node=NODEFS.createNode(parent,name,mode,dev);var path=NODEFS.realPath(node);try{if(FS.isDir(node.mode)){fs.mkdirSync(path,node.mode)}else{fs.writeFileSync(path,"",{mode:node.mode})}}catch(e){if(!e.code)throw e;throw new FS.ErrnoError(ERRNO_CODES[e.code])}return node}),rename:(function(oldNode,newDir,newName){var oldPath=NODEFS.realPath(oldNode);var newPath=PATH.join2(NODEFS.realPath(newDir),newName);try{fs.renameSync(oldPath,newPath)}catch(e){if(!e.code)throw e;throw new FS.ErrnoError(ERRNO_CODES[e.code])}}),unlink:(function(parent,name){var path=PATH.join2(NODEFS.realPath(parent),name);try{fs.unlinkSync(path)}catch(e){if(!e.code)throw e;throw new FS.ErrnoError(ERRNO_CODES[e.code])}}),rmdir:(function(parent,name){var path=PATH.join2(NODEFS.realPath(parent),name);try{fs.rmdirSync(path)}catch(e){if(!e.code)throw e;throw new FS.ErrnoError(ERRNO_CODES[e.code])}}),readdir:(function(node){var path=NODEFS.realPath(node);try{return fs.readdirSync(path)}catch(e){if(!e.code)throw e;throw new FS.ErrnoError(ERRNO_CODES[e.code])}}),symlink:(function(parent,newName,oldPath){var newPath=PATH.join2(NODEFS.realPath(parent),newName);try{fs.symlinkSync(oldPath,newPath)}catch(e){if(!e.code)throw e;throw new FS.ErrnoError(ERRNO_CODES[e.code])}}),readlink:(function(node){var path=NODEFS.realPath(node);try{path=fs.readlinkSync(path);path=NODEJS_PATH.relative(NODEJS_PATH.resolve(node.mount.opts.root),path);return path}catch(e){if(!e.code)throw e;throw new FS.ErrnoError(ERRNO_CODES[e.code])}})},stream_ops:{open:(function(stream){var path=NODEFS.realPath(stream.node);try{if(FS.isFile(stream.node.mode)){stream.nfd=fs.openSync(path,NODEFS.flagsForNode(stream.flags))}}catch(e){if(!e.code)throw e;throw new FS.ErrnoError(ERRNO_CODES[e.code])}}),close:(function(stream){try{if(FS.isFile(stream.node.mode)&&stream.nfd){fs.closeSync(stream.nfd)}}catch(e){if(!e.code)throw e;throw new FS.ErrnoError(ERRNO_CODES[e.code])}}),read:(function(stream,buffer,offset,length,position){if(length===0)return 0;try{return fs.readSync(stream.nfd,NODEFS.bufferFrom(buffer.buffer),offset,length,position)}catch(e){throw new FS.ErrnoError(ERRNO_CODES[e.code])}}),write:(function(stream,buffer,offset,length,position){try{return fs.writeSync(stream.nfd,NODEFS.bufferFrom(buffer.buffer),offset,length,position)}catch(e){throw new FS.ErrnoError(ERRNO_CODES[e.code])}}),llseek:(function(stream,offset,whence){var position=offset;if(whence===1){position+=stream.position}else if(whence===2){if(FS.isFile(stream.node.mode)){try{var stat=fs.fstatSync(stream.nfd);position+=stat.size}catch(e){throw new FS.ErrnoError(ERRNO_CODES[e.code])}}}if(position<0){throw new FS.ErrnoError(ERRNO_CODES.EINVAL)}return position})}};var ERRNO_CODES={EPERM:1,ENOENT:2,ESRCH:3,EINTR:4,EIO:5,ENXIO:6,E2BIG:7,ENOEXEC:8,EBADF:9,ECHILD:10,EAGAIN:11,EWOULDBLOCK:11,ENOMEM:12,EACCES:13,EFAULT:14,ENOTBLK:15,EBUSY:16,EEXIST:17,EXDEV:18,ENODEV:19,ENOTDIR:20,EISDIR:21,EINVAL:22,ENFILE:23,EMFILE:24,ENOTTY:25,ETXTBSY:26,EFBIG:27,ENOSPC:28,ESPIPE:29,EROFS:30,EMLINK:31,EPIPE:32,EDOM:33,ERANGE:34,ENOMSG:42,EIDRM:43,ECHRNG:44,EL2NSYNC:45,EL3HLT:46,EL3RST:47,ELNRNG:48,EUNATCH:49,ENOCSI:50,EL2HLT:51,EDEADLK:35,ENOLCK:37,EBADE:52,EBADR:53,EXFULL:54,ENOANO:55,EBADRQC:56,EBADSLT:57,EDEADLOCK:35,EBFONT:59,ENOSTR:60,ENODATA:61,ETIME:62,ENOSR:63,ENONET:64,ENOPKG:65,EREMOTE:66,ENOLINK:67,EADV:68,ESRMNT:69,ECOMM:70,EPROTO:71,EMULTIHOP:72,EDOTDOT:73,EBADMSG:74,ENOTUNIQ:76,EBADFD:77,EREMCHG:78,ELIBACC:79,ELIBBAD:80,ELIBSCN:81,ELIBMAX:82,ELIBEXEC:83,ENOSYS:38,ENOTEMPTY:39,ENAMETOOLONG:36,ELOOP:40,EOPNOTSUPP:95,EPFNOSUPPORT:96,ECONNRESET:104,ENOBUFS:105,EAFNOSUPPORT:97,EPROTOTYPE:91,ENOTSOCK:88,ENOPROTOOPT:92,ESHUTDOWN:108,ECONNREFUSED:111,EADDRINUSE:98,ECONNABORTED:103,ENETUNREACH:101,ENETDOWN:100,ETIMEDOUT:110,EHOSTDOWN:112,EHOSTUNREACH:113,EINPROGRESS:115,EALREADY:114,EDESTADDRREQ:89,EMSGSIZE:90,EPROTONOSUPPORT:93,ESOCKTNOSUPPORT:94,EADDRNOTAVAIL:99,ENETRESET:102,EISCONN:106,ENOTCONN:107,ETOOMANYREFS:109,EUSERS:87,EDQUOT:122,ESTALE:116,ENOTSUP:95,ENOMEDIUM:123,EILSEQ:84,EOVERFLOW:75,ECANCELED:125,ENOTRECOVERABLE:131,EOWNERDEAD:130,ESTRPIPE:86};var NODERAWFS={lookupPath:(function(path){return{path:path,node:{mode:NODEFS.getMode(path)}}}),createStandardStreams:(function(){FS.streams[0]={fd:0,nfd:0,position:0,path:"",flags:0,tty:true,seekable:false};for(var i=1;i<3;i++){FS.streams[i]={fd:i,nfd:i,position:0,path:"",flags:577,tty:true,seekable:false}}}),cwd:(function(){return process.cwd()}),chdir:(function(){process.chdir.apply(void 0,arguments)}),mknod:(function(path,mode){if(FS.isDir(path)){fs.mkdirSync(path,mode)}else{fs.writeFileSync(path,"",{mode:mode})}}),mkdir:(function(){fs.mkdirSync.apply(void 0,arguments)}),symlink:(function(){fs.symlinkSync.apply(void 0,arguments)}),rename:(function(){fs.renameSync.apply(void 0,arguments)}),rmdir:(function(){fs.rmdirSync.apply(void 0,arguments)}),readdir:(function(){fs.readdirSync.apply(void 0,arguments)}),unlink:(function(){fs.unlinkSync.apply(void 0,arguments)}),readlink:(function(){return fs.readlinkSync.apply(void 0,arguments)}),stat:(function(){return fs.statSync.apply(void 0,arguments)}),lstat:(function(){return fs.lstatSync.apply(void 0,arguments)}),chmod:(function(){fs.chmodSync.apply(void 0,arguments)}),fchmod:(function(){fs.fchmodSync.apply(void 0,arguments)}),chown:(function(){fs.chownSync.apply(void 0,arguments)}),fchown:(function(){fs.fchownSync.apply(void 0,arguments)}),truncate:(function(){fs.truncateSync.apply(void 0,arguments)}),ftruncate:(function(){fs.ftruncateSync.apply(void 0,arguments)}),utime:(function(){fs.utimesSync.apply(void 0,arguments)}),open:(function(path,flags,mode,suggestFD){if(typeof flags==="string"){flags=VFS.modeStringToFlags(flags)}var nfd=fs.openSync(path,NODEFS.flagsForNode(flags),mode);var fd=suggestFD!=null?suggestFD:FS.nextfd(nfd);var stream={fd:fd,nfd:nfd,position:0,path:path,flags:flags,seekable:true};FS.streams[fd]=stream;return stream}),close:(function(stream){if(!stream.stream_ops){fs.closeSync(stream.nfd)}FS.closeStream(stream.fd)}),llseek:(function(stream,offset,whence){if(stream.stream_ops){return VFS.llseek(stream,offset,whence)}var position=offset;if(whence===1){position+=stream.position}else if(whence===2){position+=fs.fstatSync(stream.nfd).size}if(position<0){throw new FS.ErrnoError(ERRNO_CODES.EINVAL)}stream.position=position;return position}),read:(function(stream,buffer,offset,length,position){if(stream.stream_ops){return VFS.read(stream,buffer,offset,length,position)}var seeking=typeof position!=="undefined";if(!seeking&&stream.seekable)position=stream.position;var bytesRead=fs.readSync(stream.nfd,NODEFS.bufferFrom(buffer.buffer),offset,length,position);if(!seeking)stream.position+=bytesRead;return bytesRead}),write:(function(stream,buffer,offset,length,position){if(stream.stream_ops){return VFS.write(stream,buffer,offset,length,position)}if(stream.flags&+"1024"){FS.llseek(stream,0,+"2")}var seeking=typeof position!=="undefined";if(!seeking&&stream.seekable)position=stream.position;var bytesWritten=fs.writeSync(stream.nfd,NODEFS.bufferFrom(buffer.buffer),offset,length,position);if(!seeking)stream.position+=bytesWritten;return bytesWritten}),allocate:(function(){throw new FS.ErrnoError(ERRNO_CODES.EOPNOTSUPP)}),mmap:(function(){throw new FS.ErrnoError(ERRNO_CODES.ENODEV)}),msync:(function(){return 0}),munmap:(function(){return 0}),ioctl:(function(){throw new FS.ErrnoError(ERRNO_CODES.ENOTTY)})};var ERRNO_MESSAGES={0:"Success",1:"Not super-user",2:"No such file or directory",3:"No such process",4:"Interrupted system call",5:"I/O error",6:"No such device or address",7:"Arg list too long",8:"Exec format error",9:"Bad file number",10:"No children",11:"No more processes",12:"Not enough core",13:"Permission denied",14:"Bad address",15:"Block device required",16:"Mount device busy",17:"File exists",18:"Cross-device link",19:"No such device",20:"Not a directory",21:"Is a directory",22:"Invalid argument",23:"Too many open files in system",24:"Too many open files",25:"Not a typewriter",26:"Text file busy",27:"File too large",28:"No space left on device",29:"Illegal seek",30:"Read only file system",31:"Too many links",32:"Broken pipe",33:"Math arg out of domain of func",34:"Math result not representable",35:"File locking deadlock error",36:"File or path name too long",37:"No record locks available",38:"Function not implemented",39:"Directory not empty",40:"Too many symbolic links",42:"No message of desired type",43:"Identifier removed",44:"Channel number out of range",45:"Level 2 not synchronized",46:"Level 3 halted",47:"Level 3 reset",48:"Link number out of range",49:"Protocol driver not attached",50:"No CSI structure available",51:"Level 2 halted",52:"Invalid exchange",53:"Invalid request descriptor",54:"Exchange full",55:"No anode",56:"Invalid request code",57:"Invalid slot",59:"Bad font file fmt",60:"Device not a stream",61:"No data (for no delay io)",62:"Timer expired",63:"Out of streams resources",64:"Machine is not on the network",65:"Package not installed",66:"The object is remote",67:"The link has been severed",68:"Advertise error",69:"Srmount error",70:"Communication error on send",71:"Protocol error",72:"Multihop attempted",73:"Cross mount point (not really error)",74:"Trying to read unreadable message",75:"Value too large for defined data type",76:"Given log. name not unique",77:"f.d. invalid for this operation",78:"Remote address changed",79:"Can   access a needed shared lib",80:"Accessing a corrupted shared lib",81:".lib section in a.out corrupted",82:"Attempting to link in too many libs",83:"Attempting to exec a shared library",84:"Illegal byte sequence",86:"Streams pipe error",87:"Too many users",88:"Socket operation on non-socket",89:"Destination address required",90:"Message too long",91:"Protocol wrong type for socket",92:"Protocol not available",93:"Unknown protocol",94:"Socket type not supported",95:"Not supported",96:"Protocol family not supported",97:"Address family not supported by protocol family",98:"Address already in use",99:"Address not available",100:"Network interface is not configured",101:"Network is unreachable",102:"Connection reset by network",103:"Connection aborted",104:"Connection reset by peer",105:"No buffer space available",106:"Socket is already connected",107:"Socket is not connected",108:"Can't send after socket shutdown",109:"Too many references",110:"Connection timed out",111:"Connection refused",112:"Host is down",113:"Host is unreachable",114:"Socket already connected",115:"Connection already in progress",116:"Stale file handle",122:"Quota exceeded",123:"No medium (in tape drive)",125:"Operation canceled",130:"Previous owner died",131:"State not recoverable"};var FS={root:null,mounts:[],devices:{},streams:[],nextInode:1,nameTable:null,currentPath:"/",initialized:false,ignorePermissions:true,trackingDelegate:{},tracking:{openFlags:{READ:1,WRITE:2}},ErrnoError:null,genericErrors:{},filesystems:null,syncFSRequests:0,handleFSError:(function(e){if(!(e instanceof FS.ErrnoError))throw e+" : "+stackTrace();return ___setErrNo(e.errno)}),lookupPath:(function(path,opts){path=PATH.resolve(FS.cwd(),path);opts=opts||{};if(!path)return{path:"",node:null};var defaults={follow_mount:true,recurse_count:0};for(var key in defaults){if(opts[key]===undefined){opts[key]=defaults[key]}}if(opts.recurse_count>8){throw new FS.ErrnoError(40)}var parts=PATH.normalizeArray(path.split("/").filter((function(p){return!!p})),false);var current=FS.root;var current_path="/";for(var i=0;i<parts.length;i++){var islast=i===parts.length-1;if(islast&&opts.parent){break}current=FS.lookupNode(current,parts[i]);current_path=PATH.join2(current_path,parts[i]);if(FS.isMountpoint(current)){if(!islast||islast&&opts.follow_mount){current=current.mounted.root}}if(!islast||opts.follow){var count=0;while(FS.isLink(current.mode)){var link=FS.readlink(current_path);current_path=PATH.resolve(PATH.dirname(current_path),link);var lookup=FS.lookupPath(current_path,{recurse_count:opts.recurse_count});current=lookup.node;if(count++>40){throw new FS.ErrnoError(40)}}}}return{path:current_path,node:current}}),getPath:(function(node){var path;while(true){if(FS.isRoot(node)){var mount=node.mount.mountpoint;if(!path)return mount;return mount[mount.length-1]!=="/"?mount+"/"+path:mount+path}path=path?node.name+"/"+path:node.name;node=node.parent}}),hashName:(function(parentid,name){var hash=0;for(var i=0;i<name.length;i++){hash=(hash<<5)-hash+name.charCodeAt(i)|0}return(parentid+hash>>>0)%FS.nameTable.length}),hashAddNode:(function(node){var hash=FS.hashName(node.parent.id,node.name);node.name_next=FS.nameTable[hash];FS.nameTable[hash]=node}),hashRemoveNode:(function(node){var hash=FS.hashName(node.parent.id,node.name);if(FS.nameTable[hash]===node){FS.nameTable[hash]=node.name_next}else{var current=FS.nameTable[hash];while(current){if(current.name_next===node){current.name_next=node.name_next;break}current=current.name_next}}}),lookupNode:(function(parent,name){var err=FS.mayLookup(parent);if(err){throw new FS.ErrnoError(err,parent)}var hash=FS.hashName(parent.id,name);for(var node=FS.nameTable[hash];node;node=node.name_next){var nodeName=node.name;if(node.parent.id===parent.id&&nodeName===name){return node}}return FS.lookup(parent,name)}),createNode:(function(parent,name,mode,rdev){if(!FS.FSNode){FS.FSNode=(function(parent,name,mode,rdev){if(!parent){parent=this}this.parent=parent;this.mount=parent.mount;this.mounted=null;this.id=FS.nextInode++;this.name=name;this.mode=mode;this.node_ops={};this.stream_ops={};this.rdev=rdev});FS.FSNode.prototype={};var readMode=292|73;var writeMode=146;Object.defineProperties(FS.FSNode.prototype,{read:{get:(function(){return(this.mode&readMode)===readMode}),set:(function(val){val?this.mode|=readMode:this.mode&=~readMode})},write:{get:(function(){return(this.mode&writeMode)===writeMode}),set:(function(val){val?this.mode|=writeMode:this.mode&=~writeMode})},isFolder:{get:(function(){return FS.isDir(this.mode)})},isDevice:{get:(function(){return FS.isChrdev(this.mode)})}})}var node=new FS.FSNode(parent,name,mode,rdev);FS.hashAddNode(node);return node}),destroyNode:(function(node){FS.hashRemoveNode(node)}),isRoot:(function(node){return node===node.parent}),isMountpoint:(function(node){return!!node.mounted}),isFile:(function(mode){return(mode&61440)===32768}),isDir:(function(mode){return(mode&61440)===16384}),isLink:(function(mode){return(mode&61440)===40960}),isChrdev:(function(mode){return(mode&61440)===8192}),isBlkdev:(function(mode){return(mode&61440)===24576}),isFIFO:(function(mode){return(mode&61440)===4096}),isSocket:(function(mode){return(mode&49152)===49152}),flagModes:{"r":0,"rs":1052672,"r+":2,"w":577,"wx":705,"xw":705,"w+":578,"wx+":706,"xw+":706,"a":1089,"ax":1217,"xa":1217,"a+":1090,"ax+":1218,"xa+":1218},modeStringToFlags:(function(str){var flags=FS.flagModes[str];if(typeof flags==="undefined"){throw new Error("Unknown file open mode: "+str)}return flags}),flagsToPermissionString:(function(flag){var perms=["r","w","rw"][flag&3];if(flag&512){perms+="w"}return perms}),nodePermissions:(function(node,perms){if(FS.ignorePermissions){return 0}if(perms.indexOf("r")!==-1&&!(node.mode&292)){return 13}else if(perms.indexOf("w")!==-1&&!(node.mode&146)){return 13}else if(perms.indexOf("x")!==-1&&!(node.mode&73)){return 13}return 0}),mayLookup:(function(dir){var err=FS.nodePermissions(dir,"x");if(err)return err;if(!dir.node_ops.lookup)return 13;return 0}),mayCreate:(function(dir,name){try{var node=FS.lookupNode(dir,name);return 17}catch(e){}return FS.nodePermissions(dir,"wx")}),mayDelete:(function(dir,name,isdir){var node;try{node=FS.lookupNode(dir,name)}catch(e){return e.errno}var err=FS.nodePermissions(dir,"wx");if(err){return err}if(isdir){if(!FS.isDir(node.mode)){return 20}if(FS.isRoot(node)||FS.getPath(node)===FS.cwd()){return 16}}else{if(FS.isDir(node.mode)){return 21}}return 0}),mayOpen:(function(node,flags){if(!node){return 2}if(FS.isLink(node.mode)){return 40}else if(FS.isDir(node.mode)){if(FS.flagsToPermissionString(flags)!=="r"||flags&512){return 21}}return FS.nodePermissions(node,FS.flagsToPermissionString(flags))}),MAX_OPEN_FDS:4096,nextfd:(function(fd_start,fd_end){fd_start=fd_start||0;fd_end=fd_end||FS.MAX_OPEN_FDS;for(var fd=fd_start;fd<=fd_end;fd++){if(!FS.streams[fd]){return fd}}throw new FS.ErrnoError(24)}),getStream:(function(fd){return FS.streams[fd]}),createStream:(function(stream,fd_start,fd_end){if(!FS.FSStream){FS.FSStream=(function(){});FS.FSStream.prototype={};Object.defineProperties(FS.FSStream.prototype,{object:{get:(function(){return this.node}),set:(function(val){this.node=val})},isRead:{get:(function(){return(this.flags&2097155)!==1})},isWrite:{get:(function(){return(this.flags&2097155)!==0})},isAppend:{get:(function(){return this.flags&1024})}})}var newStream=new FS.FSStream;for(var p in stream){newStream[p]=stream[p]}stream=newStream;var fd=FS.nextfd(fd_start,fd_end);stream.fd=fd;FS.streams[fd]=stream;return stream}),closeStream:(function(fd){FS.streams[fd]=null}),chrdev_stream_ops:{open:(function(stream){var device=FS.getDevice(stream.node.rdev);stream.stream_ops=device.stream_ops;if(stream.stream_ops.open){stream.stream_ops.open(stream)}}),llseek:(function(){throw new FS.ErrnoError(29)})},major:(function(dev){return dev>>8}),minor:(function(dev){return dev&255}),makedev:(function(ma,mi){return ma<<8|mi}),registerDevice:(function(dev,ops){FS.devices[dev]={stream_ops:ops}}),getDevice:(function(dev){return FS.devices[dev]}),getMounts:(function(mount){var mounts=[];var check=[mount];while(check.length){var m=check.pop();mounts.push(m);check.push.apply(check,m.mounts)}return mounts}),syncfs:(function(populate,callback){if(typeof populate==="function"){callback=populate;populate=false}FS.syncFSRequests++;if(FS.syncFSRequests>1){console.log("warning: "+FS.syncFSRequests+" FS.syncfs operations in flight at once, probably just doing extra work")}var mounts=FS.getMounts(FS.root.mount);var completed=0;function doCallback(err){assert(FS.syncFSRequests>0);FS.syncFSRequests--;return callback(err)}function done(err){if(err){if(!done.errored){done.errored=true;return doCallback(err)}return}if(++completed>=mounts.length){doCallback(null)}}mounts.forEach((function(mount){if(!mount.type.syncfs){return done(null)}mount.type.syncfs(mount,populate,done)}))}),mount:(function(type,opts,mountpoint){var root=mountpoint==="/";var pseudo=!mountpoint;var node;if(root&&FS.root){throw new FS.ErrnoError(16)}else if(!root&&!pseudo){var lookup=FS.lookupPath(mountpoint,{follow_mount:false});mountpoint=lookup.path;node=lookup.node;if(FS.isMountpoint(node)){throw new FS.ErrnoError(16)}if(!FS.isDir(node.mode)){throw new FS.ErrnoError(20)}}var mount={type:type,opts:opts,mountpoint:mountpoint,mounts:[]};var mountRoot=type.mount(mount);mountRoot.mount=mount;mount.root=mountRoot;if(root){FS.root=mountRoot}else if(node){node.mounted=mount;if(node.mount){node.mount.mounts.push(mount)}}return mountRoot}),unmount:(function(mountpoint){var lookup=FS.lookupPath(mountpoint,{follow_mount:false});if(!FS.isMountpoint(lookup.node)){throw new FS.ErrnoError(22)}var node=lookup.node;var mount=node.mounted;var mounts=FS.getMounts(mount);Object.keys(FS.nameTable).forEach((function(hash){var current=FS.nameTable[hash];while(current){var next=current.name_next;if(mounts.indexOf(current.mount)!==-1){FS.destroyNode(current)}current=next}}));node.mounted=null;var idx=node.mount.mounts.indexOf(mount);assert(idx!==-1);node.mount.mounts.splice(idx,1)}),lookup:(function(parent,name){return parent.node_ops.lookup(parent,name)}),mknod:(function(path,mode,dev){var lookup=FS.lookupPath(path,{parent:true});var parent=lookup.node;var name=PATH.basename(path);if(!name||name==="."||name===".."){throw new FS.ErrnoError(22)}var err=FS.mayCreate(parent,name);if(err){throw new FS.ErrnoError(err)}if(!parent.node_ops.mknod){throw new FS.ErrnoError(1)}return parent.node_ops.mknod(parent,name,mode,dev)}),create:(function(path,mode){mode=mode!==undefined?mode:438;mode&=4095;mode|=32768;return FS.mknod(path,mode,0)}),mkdir:(function(path,mode){mode=mode!==undefined?mode:511;mode&=511|512;mode|=16384;return FS.mknod(path,mode,0)}),mkdirTree:(function(path,mode){var dirs=path.split("/");var d="";for(var i=0;i<dirs.length;++i){if(!dirs[i])continue;d+="/"+dirs[i];try{FS.mkdir(d,mode)}catch(e){if(e.errno!=17)throw e}}}),mkdev:(function(path,mode,dev){if(typeof dev==="undefined"){dev=mode;mode=438}mode|=8192;return FS.mknod(path,mode,dev)}),symlink:(function(oldpath,newpath){if(!PATH.resolve(oldpath)){throw new FS.ErrnoError(2)}var lookup=FS.lookupPath(newpath,{parent:true});var parent=lookup.node;if(!parent){throw new FS.ErrnoError(2)}var newname=PATH.basename(newpath);var err=FS.mayCreate(parent,newname);if(err){throw new FS.ErrnoError(err)}if(!parent.node_ops.symlink){throw new FS.ErrnoError(1)}return parent.node_ops.symlink(parent,newname,oldpath)}),rename:(function(old_path,new_path){var old_dirname=PATH.dirname(old_path);var new_dirname=PATH.dirname(new_path);var old_name=PATH.basename(old_path);var new_name=PATH.basename(new_path);var lookup,old_dir,new_dir;try{lookup=FS.lookupPath(old_path,{parent:true});old_dir=lookup.node;lookup=FS.lookupPath(new_path,{parent:true});new_dir=lookup.node}catch(e){throw new FS.ErrnoError(16)}if(!old_dir||!new_dir)throw new FS.ErrnoError(2);if(old_dir.mount!==new_dir.mount){throw new FS.ErrnoError(18)}var old_node=FS.lookupNode(old_dir,old_name);var relative=PATH.relative(old_path,new_dirname);if(relative.charAt(0)!=="."){throw new FS.ErrnoError(22)}relative=PATH.relative(new_path,old_dirname);if(relative.charAt(0)!=="."){throw new FS.ErrnoError(39)}var new_node;try{new_node=FS.lookupNode(new_dir,new_name)}catch(e){}if(old_node===new_node){return}var isdir=FS.isDir(old_node.mode);var err=FS.mayDelete(old_dir,old_name,isdir);if(err){throw new FS.ErrnoError(err)}err=new_node?FS.mayDelete(new_dir,new_name,isdir):FS.mayCreate(new_dir,new_name);if(err){throw new FS.ErrnoError(err)}if(!old_dir.node_ops.rename){throw new FS.ErrnoError(1)}if(FS.isMountpoint(old_node)||new_node&&FS.isMountpoint(new_node)){throw new FS.ErrnoError(16)}if(new_dir!==old_dir){err=FS.nodePermissions(old_dir,"w");if(err){throw new FS.ErrnoError(err)}}try{if(FS.trackingDelegate["willMovePath"]){FS.trackingDelegate["willMovePath"](old_path,new_path)}}catch(e){console.log("FS.trackingDelegate['willMovePath']('"+old_path+"', '"+new_path+"') threw an exception: "+e.message)}FS.hashRemoveNode(old_node);try{old_dir.node_ops.rename(old_node,new_dir,new_name)}catch(e){throw e}finally{FS.hashAddNode(old_node)}try{if(FS.trackingDelegate["onMovePath"])FS.trackingDelegate["onMovePath"](old_path,new_path)}catch(e){console.log("FS.trackingDelegate['onMovePath']('"+old_path+"', '"+new_path+"') threw an exception: "+e.message)}}),rmdir:(function(path){var lookup=FS.lookupPath(path,{parent:true});var parent=lookup.node;var name=PATH.basename(path);var node=FS.lookupNode(parent,name);var err=FS.mayDelete(parent,name,true);if(err){throw new FS.ErrnoError(err)}if(!parent.node_ops.rmdir){throw new FS.ErrnoError(1)}if(FS.isMountpoint(node)){throw new FS.ErrnoError(16)}try{if(FS.trackingDelegate["willDeletePath"]){FS.trackingDelegate["willDeletePath"](path)}}catch(e){console.log("FS.trackingDelegate['willDeletePath']('"+path+"') threw an exception: "+e.message)}parent.node_ops.rmdir(parent,name);FS.destroyNode(node);try{if(FS.trackingDelegate["onDeletePath"])FS.trackingDelegate["onDeletePath"](path)}catch(e){console.log("FS.trackingDelegate['onDeletePath']('"+path+"') threw an exception: "+e.message)}}),readdir:(function(path){var lookup=FS.lookupPath(path,{follow:true});var node=lookup.node;if(!node.node_ops.readdir){throw new FS.ErrnoError(20)}return node.node_ops.readdir(node)}),unlink:(function(path){var lookup=FS.lookupPath(path,{parent:true});var parent=lookup.node;var name=PATH.basename(path);var node=FS.lookupNode(parent,name);var err=FS.mayDelete(parent,name,false);if(err){throw new FS.ErrnoError(err)}if(!parent.node_ops.unlink){throw new FS.ErrnoError(1)}if(FS.isMountpoint(node)){throw new FS.ErrnoError(16)}try{if(FS.trackingDelegate["willDeletePath"]){FS.trackingDelegate["willDeletePath"](path)}}catch(e){console.log("FS.trackingDelegate['willDeletePath']('"+path+"') threw an exception: "+e.message)}parent.node_ops.unlink(parent,name);FS.destroyNode(node);try{if(FS.trackingDelegate["onDeletePath"])FS.trackingDelegate["onDeletePath"](path)}catch(e){console.log("FS.trackingDelegate['onDeletePath']('"+path+"') threw an exception: "+e.message)}}),readlink:(function(path){var lookup=FS.lookupPath(path);var link=lookup.node;if(!link){throw new FS.ErrnoError(2)}if(!link.node_ops.readlink){throw new FS.ErrnoError(22)}return PATH.resolve(FS.getPath(link.parent),link.node_ops.readlink(link))}),stat:(function(path,dontFollow){var lookup=FS.lookupPath(path,{follow:!dontFollow});var node=lookup.node;if(!node){throw new FS.ErrnoError(2)}if(!node.node_ops.getattr){throw new FS.ErrnoError(1)}return node.node_ops.getattr(node)}),lstat:(function(path){return FS.stat(path,true)}),chmod:(function(path,mode,dontFollow){var node;if(typeof path==="string"){var lookup=FS.lookupPath(path,{follow:!dontFollow});node=lookup.node}else{node=path}if(!node.node_ops.setattr){throw new FS.ErrnoError(1)}node.node_ops.setattr(node,{mode:mode&4095|node.mode&~4095,timestamp:Date.now()})}),lchmod:(function(path,mode){FS.chmod(path,mode,true)}),fchmod:(function(fd,mode){var stream=FS.getStream(fd);if(!stream){throw new FS.ErrnoError(9)}FS.chmod(stream.node,mode)}),chown:(function(path,uid,gid,dontFollow){var node;if(typeof path==="string"){var lookup=FS.lookupPath(path,{follow:!dontFollow});node=lookup.node}else{node=path}if(!node.node_ops.setattr){throw new FS.ErrnoError(1)}node.node_ops.setattr(node,{timestamp:Date.now()})}),lchown:(function(path,uid,gid){FS.chown(path,uid,gid,true)}),fchown:(function(fd,uid,gid){var stream=FS.getStream(fd);if(!stream){throw new FS.ErrnoError(9)}FS.chown(stream.node,uid,gid)}),truncate:(function(path,len){if(len<0){throw new FS.ErrnoError(22)}var node;if(typeof path==="string"){var lookup=FS.lookupPath(path,{follow:true});node=lookup.node}else{node=path}if(!node.node_ops.setattr){throw new FS.ErrnoError(1)}if(FS.isDir(node.mode)){throw new FS.ErrnoError(21)}if(!FS.isFile(node.mode)){throw new FS.ErrnoError(22)}var err=FS.nodePermissions(node,"w");if(err){throw new FS.ErrnoError(err)}node.node_ops.setattr(node,{size:len,timestamp:Date.now()})}),ftruncate:(function(fd,len){var stream=FS.getStream(fd);if(!stream){throw new FS.ErrnoError(9)}if((stream.flags&2097155)===0){throw new FS.ErrnoError(22)}FS.truncate(stream.node,len)}),utime:(function(path,atime,mtime){var lookup=FS.lookupPath(path,{follow:true});var node=lookup.node;node.node_ops.setattr(node,{timestamp:Math.max(atime,mtime)})}),open:(function(path,flags,mode,fd_start,fd_end){if(path===""){throw new FS.ErrnoError(2)}flags=typeof flags==="string"?FS.modeStringToFlags(flags):flags;mode=typeof mode==="undefined"?438:mode;if(flags&64){mode=mode&4095|32768}else{mode=0}var node;if(typeof path==="object"){node=path}else{path=PATH.normalize(path);try{var lookup=FS.lookupPath(path,{follow:!(flags&131072)});node=lookup.node}catch(e){}}var created=false;if(flags&64){if(node){if(flags&128){throw new FS.ErrnoError(17)}}else{node=FS.mknod(path,mode,0);created=true}}if(!node){throw new FS.ErrnoError(2)}if(FS.isChrdev(node.mode)){flags&=~512}if(flags&65536&&!FS.isDir(node.mode)){throw new FS.ErrnoError(20)}if(!created){var err=FS.mayOpen(node,flags);if(err){throw new FS.ErrnoError(err)}}if(flags&512){FS.truncate(node,0)}flags&=~(128|512);var stream=FS.createStream({node:node,path:FS.getPath(node),flags:flags,seekable:true,position:0,stream_ops:node.stream_ops,ungotten:[],error:false},fd_start,fd_end);if(stream.stream_ops.open){stream.stream_ops.open(stream)}if(Module["logReadFiles"]&&!(flags&1)){if(!FS.readFiles)FS.readFiles={};if(!(path in FS.readFiles)){FS.readFiles[path]=1;console.log("FS.trackingDelegate error on read file: "+path)}}try{if(FS.trackingDelegate["onOpenFile"]){var trackingFlags=0;if((flags&2097155)!==1){trackingFlags|=FS.tracking.openFlags.READ}if((flags&2097155)!==0){trackingFlags|=FS.tracking.openFlags.WRITE}FS.trackingDelegate["onOpenFile"](path,trackingFlags)}}catch(e){console.log("FS.trackingDelegate['onOpenFile']('"+path+"', flags) threw an exception: "+e.message)}return stream}),close:(function(stream){if(FS.isClosed(stream)){throw new FS.ErrnoError(9)}if(stream.getdents)stream.getdents=null;try{if(stream.stream_ops.close){stream.stream_ops.close(stream)}}catch(e){throw e}finally{FS.closeStream(stream.fd)}stream.fd=null}),isClosed:(function(stream){return stream.fd===null}),llseek:(function(stream,offset,whence){if(FS.isClosed(stream)){throw new FS.ErrnoError(9)}if(!stream.seekable||!stream.stream_ops.llseek){throw new FS.ErrnoError(29)}stream.position=stream.stream_ops.llseek(stream,offset,whence);stream.ungotten=[];return stream.position}),read:(function(stream,buffer,offset,length,position){if(length<0||position<0){throw new FS.ErrnoError(22)}if(FS.isClosed(stream)){throw new FS.ErrnoError(9)}if((stream.flags&2097155)===1){throw new FS.ErrnoError(9)}if(FS.isDir(stream.node.mode)){throw new FS.ErrnoError(21)}if(!stream.stream_ops.read){throw new FS.ErrnoError(22)}var seeking=typeof position!=="undefined";if(!seeking){position=stream.position}else if(!stream.seekable){throw new FS.ErrnoError(29)}var bytesRead=stream.stream_ops.read(stream,buffer,offset,length,position);if(!seeking)stream.position+=bytesRead;return bytesRead}),write:(function(stream,buffer,offset,length,position,canOwn){if(length<0||position<0){throw new FS.ErrnoError(22)}if(FS.isClosed(stream)){throw new FS.ErrnoError(9)}if((stream.flags&2097155)===0){throw new FS.ErrnoError(9)}if(FS.isDir(stream.node.mode)){throw new FS.ErrnoError(21)}if(!stream.stream_ops.write){throw new FS.ErrnoError(22)}if(stream.flags&1024){FS.llseek(stream,0,2)}var seeking=typeof position!=="undefined";if(!seeking){position=stream.position}else if(!stream.seekable){throw new FS.ErrnoError(29)}var bytesWritten=stream.stream_ops.write(stream,buffer,offset,length,position,canOwn);if(!seeking)stream.position+=bytesWritten;try{if(stream.path&&FS.trackingDelegate["onWriteToFile"])FS.trackingDelegate["onWriteToFile"](stream.path)}catch(e){console.log("FS.trackingDelegate['onWriteToFile']('"+path+"') threw an exception: "+e.message)}return bytesWritten}),allocate:(function(stream,offset,length){if(FS.isClosed(stream)){throw new FS.ErrnoError(9)}if(offset<0||length<=0){throw new FS.ErrnoError(22)}if((stream.flags&2097155)===0){throw new FS.ErrnoError(9)}if(!FS.isFile(stream.node.mode)&&!FS.isDir(stream.node.mode)){throw new FS.ErrnoError(19)}if(!stream.stream_ops.allocate){throw new FS.ErrnoError(95)}stream.stream_ops.allocate(stream,offset,length)}),mmap:(function(stream,buffer,offset,length,position,prot,flags){if((stream.flags&2097155)===1){throw new FS.ErrnoError(13)}if(!stream.stream_ops.mmap){throw new FS.ErrnoError(19)}return stream.stream_ops.mmap(stream,buffer,offset,length,position,prot,flags)}),msync:(function(stream,buffer,offset,length,mmapFlags){if(!stream||!stream.stream_ops.msync){return 0}return stream.stream_ops.msync(stream,buffer,offset,length,mmapFlags)}),munmap:(function(stream){return 0}),ioctl:(function(stream,cmd,arg){if(!stream.stream_ops.ioctl){throw new FS.ErrnoError(25)}return stream.stream_ops.ioctl(stream,cmd,arg)}),readFile:(function(path,opts){opts=opts||{};opts.flags=opts.flags||"r";opts.encoding=opts.encoding||"binary";if(opts.encoding!=="utf8"&&opts.encoding!=="binary"){throw new Error('Invalid encoding type "'+opts.encoding+'"')}var ret;var stream=FS.open(path,opts.flags);var stat=FS.stat(path);var length=stat.size;var buf=new Uint8Array(length);FS.read(stream,buf,0,length,0);if(opts.encoding==="utf8"){ret=UTF8ArrayToString(buf,0)}else if(opts.encoding==="binary"){ret=buf}FS.close(stream);return ret}),writeFile:(function(path,data,opts){opts=opts||{};opts.flags=opts.flags||"w";var stream=FS.open(path,opts.flags,opts.mode);if(typeof data==="string"){var buf=new Uint8Array(lengthBytesUTF8(data)+1);var actualNumBytes=stringToUTF8Array(data,buf,0,buf.length);FS.write(stream,buf,0,actualNumBytes,undefined,opts.canOwn)}else if(ArrayBuffer.isView(data)){FS.write(stream,data,0,data.byteLength,undefined,opts.canOwn)}else{throw new Error("Unsupported data type")}FS.close(stream)}),cwd:(function(){return FS.currentPath}),chdir:(function(path){var lookup=FS.lookupPath(path,{follow:true});if(lookup.node===null){throw new FS.ErrnoError(2)}if(!FS.isDir(lookup.node.mode)){throw new FS.ErrnoError(20)}var err=FS.nodePermissions(lookup.node,"x");if(err){throw new FS.ErrnoError(err)}FS.currentPath=lookup.path}),createDefaultDirectories:(function(){FS.mkdir("/tmp");FS.mkdir("/home");FS.mkdir("/home/web_user")}),createDefaultDevices:(function(){FS.mkdir("/dev");FS.registerDevice(FS.makedev(1,3),{read:(function(){return 0}),write:(function(stream,buffer,offset,length,pos){return length})});FS.mkdev("/dev/null",FS.makedev(1,3));TTY.register(FS.makedev(5,0),TTY.default_tty_ops);TTY.register(FS.makedev(6,0),TTY.default_tty1_ops);FS.mkdev("/dev/tty",FS.makedev(5,0));FS.mkdev("/dev/tty1",FS.makedev(6,0));var random_device;if(typeof crypto!=="undefined"){var randomBuffer=new Uint8Array(1);random_device=(function(){crypto.getRandomValues(randomBuffer);return randomBuffer[0]})}else if(ENVIRONMENT_IS_NODE){random_device=(function(){return __webpack_require__(15)["randomBytes"](1)[0]})}else{random_device=(function(){abort("random_device")})}FS.createDevice("/dev","random",random_device);FS.createDevice("/dev","urandom",random_device);FS.mkdir("/dev/shm");FS.mkdir("/dev/shm/tmp")}),createSpecialDirectories:(function(){FS.mkdir("/proc");FS.mkdir("/proc/self");FS.mkdir("/proc/self/fd");FS.mount({mount:(function(){var node=FS.createNode("/proc/self","fd",16384|511,73);node.node_ops={lookup:(function(parent,name){var fd=+name;var stream=FS.getStream(fd);if(!stream)throw new FS.ErrnoError(9);var ret={parent:null,mount:{mountpoint:"fake"},node_ops:{readlink:(function(){return stream.path})}};ret.parent=ret;return ret})};return node})},{},"/proc/self/fd")}),createStandardStreams:(function(){if(Module["stdin"]){FS.createDevice("/dev","stdin",Module["stdin"])}else{FS.symlink("/dev/tty","/dev/stdin")}if(Module["stdout"]){FS.createDevice("/dev","stdout",null,Module["stdout"])}else{FS.symlink("/dev/tty","/dev/stdout")}if(Module["stderr"]){FS.createDevice("/dev","stderr",null,Module["stderr"])}else{FS.symlink("/dev/tty1","/dev/stderr")}var stdin=FS.open("/dev/stdin","r");assert(stdin.fd===0,"invalid handle for stdin ("+stdin.fd+")");var stdout=FS.open("/dev/stdout","w");assert(stdout.fd===1,"invalid handle for stdout ("+stdout.fd+")");var stderr=FS.open("/dev/stderr","w");assert(stderr.fd===2,"invalid handle for stderr ("+stderr.fd+")")}),ensureErrnoError:(function(){if(FS.ErrnoError)return;FS.ErrnoError=function ErrnoError(errno,node){this.node=node;this.setErrno=(function(errno){this.errno=errno;for(var key in ERRNO_CODES){if(ERRNO_CODES[key]===errno){this.code=key;break}}});this.setErrno(errno);this.message=ERRNO_MESSAGES[errno];if(this.stack)Object.defineProperty(this,"stack",{value:(new Error).stack,writable:true});if(this.stack)this.stack=demangleAll(this.stack)};FS.ErrnoError.prototype=new Error;FS.ErrnoError.prototype.constructor=FS.ErrnoError;[2].forEach((function(code){FS.genericErrors[code]=new FS.ErrnoError(code);FS.genericErrors[code].stack="<generic error, no stack>"}))}),staticInit:(function(){FS.ensureErrnoError();FS.nameTable=new Array(4096);FS.mount(MEMFS,{},"/");FS.createDefaultDirectories();FS.createDefaultDevices();FS.createSpecialDirectories();FS.filesystems={"MEMFS":MEMFS,"NODEFS":NODEFS}}),init:(function(input,output,error){assert(!FS.init.initialized,"FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)");FS.init.initialized=true;FS.ensureErrnoError();Module["stdin"]=input||Module["stdin"];Module["stdout"]=output||Module["stdout"];Module["stderr"]=error||Module["stderr"];FS.createStandardStreams()}),quit:(function(){FS.init.initialized=false;var fflush=Module["_fflush"];if(fflush)fflush(0);for(var i=0;i<FS.streams.length;i++){var stream=FS.streams[i];if(!stream){continue}FS.close(stream)}}),getMode:(function(canRead,canWrite){var mode=0;if(canRead)mode|=292|73;if(canWrite)mode|=146;return mode}),joinPath:(function(parts,forceRelative){var path=PATH.join.apply(null,parts);if(forceRelative&&path[0]=="/")path=path.substr(1);return path}),absolutePath:(function(relative,base){return PATH.resolve(base,relative)}),standardizePath:(function(path){return PATH.normalize(path)}),findObject:(function(path,dontResolveLastLink){var ret=FS.analyzePath(path,dontResolveLastLink);if(ret.exists){return ret.object}else{___setErrNo(ret.error);return null}}),analyzePath:(function(path,dontResolveLastLink){try{var lookup=FS.lookupPath(path,{follow:!dontResolveLastLink});path=lookup.path}catch(e){}var ret={isRoot:false,exists:false,error:0,name:null,path:null,object:null,parentExists:false,parentPath:null,parentObject:null};try{var lookup=FS.lookupPath(path,{parent:true});ret.parentExists=true;ret.parentPath=lookup.path;ret.parentObject=lookup.node;ret.name=PATH.basename(path);lookup=FS.lookupPath(path,{follow:!dontResolveLastLink});ret.exists=true;ret.path=lookup.path;ret.object=lookup.node;ret.name=lookup.node.name;ret.isRoot=lookup.path==="/"}catch(e){ret.error=e.errno}return ret}),createFolder:(function(parent,name,canRead,canWrite){var path=PATH.join2(typeof parent==="string"?parent:FS.getPath(parent),name);var mode=FS.getMode(canRead,canWrite);return FS.mkdir(path,mode)}),createPath:(function(parent,path,canRead,canWrite){parent=typeof parent==="string"?parent:FS.getPath(parent);var parts=path.split("/").reverse();while(parts.length){var part=parts.pop();if(!part)continue;var current=PATH.join2(parent,part);try{FS.mkdir(current)}catch(e){}parent=current}return current}),createFile:(function(parent,name,properties,canRead,canWrite){var path=PATH.join2(typeof parent==="string"?parent:FS.getPath(parent),name);var mode=FS.getMode(canRead,canWrite);return FS.create(path,mode)}),createDataFile:(function(parent,name,data,canRead,canWrite,canOwn){var path=name?PATH.join2(typeof parent==="string"?parent:FS.getPath(parent),name):parent;var mode=FS.getMode(canRead,canWrite);var node=FS.create(path,mode);if(data){if(typeof data==="string"){var arr=new Array(data.length);for(var i=0,len=data.length;i<len;++i)arr[i]=data.charCodeAt(i);data=arr}FS.chmod(node,mode|146);var stream=FS.open(node,"w");FS.write(stream,data,0,data.length,0,canOwn);FS.close(stream);FS.chmod(node,mode)}return node}),createDevice:(function(parent,name,input,output){var path=PATH.join2(typeof parent==="string"?parent:FS.getPath(parent),name);var mode=FS.getMode(!!input,!!output);if(!FS.createDevice.major)FS.createDevice.major=64;var dev=FS.makedev(FS.createDevice.major++,0);FS.registerDevice(dev,{open:(function(stream){stream.seekable=false}),close:(function(stream){if(output&&output.buffer&&output.buffer.length){output(10)}}),read:(function(stream,buffer,offset,length,pos){var bytesRead=0;for(var i=0;i<length;i++){var result;try{result=input()}catch(e){throw new FS.ErrnoError(5)}if(result===undefined&&bytesRead===0){throw new FS.ErrnoError(11)}if(result===null||result===undefined)break;bytesRead++;buffer[offset+i]=result}if(bytesRead){stream.node.timestamp=Date.now()}return bytesRead}),write:(function(stream,buffer,offset,length,pos){for(var i=0;i<length;i++){try{output(buffer[offset+i])}catch(e){throw new FS.ErrnoError(5)}}if(length){stream.node.timestamp=Date.now()}return i})});return FS.mkdev(path,mode,dev)}),createLink:(function(parent,name,target,canRead,canWrite){var path=PATH.join2(typeof parent==="string"?parent:FS.getPath(parent),name);return FS.symlink(target,path)}),forceLoadFile:(function(obj){if(obj.isDevice||obj.isFolder||obj.link||obj.contents)return true;var success=true;if(typeof XMLHttpRequest!=="undefined"){throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.")}else if(Module["read"]){try{obj.contents=intArrayFromString(Module["read"](obj.url),true);obj.usedBytes=obj.contents.length}catch(e){success=false}}else{throw new Error("Cannot load without read() or XMLHttpRequest.")}if(!success)___setErrNo(5);return success}),createLazyFile:(function(parent,name,url,canRead,canWrite){function LazyUint8Array(){this.lengthKnown=false;this.chunks=[]}LazyUint8Array.prototype.get=function LazyUint8Array_get(idx){if(idx>this.length-1||idx<0){return undefined}var chunkOffset=idx%this.chunkSize;var chunkNum=idx/this.chunkSize|0;return this.getter(chunkNum)[chunkOffset]};LazyUint8Array.prototype.setDataGetter=function LazyUint8Array_setDataGetter(getter){this.getter=getter};LazyUint8Array.prototype.cacheLength=function LazyUint8Array_cacheLength(){var xhr=new XMLHttpRequest;xhr.open("HEAD",url,false);xhr.send(null);if(!(xhr.status>=200&&xhr.status<300||xhr.status===304))throw new Error("Couldn't load "+url+". Status: "+xhr.status);var datalength=Number(xhr.getResponseHeader("Content-length"));var header;var hasByteServing=(header=xhr.getResponseHeader("Accept-Ranges"))&&header==="bytes";var usesGzip=(header=xhr.getResponseHeader("Content-Encoding"))&&header==="gzip";var chunkSize=1024*1024;if(!hasByteServing)chunkSize=datalength;var doXHR=(function(from,to){if(from>to)throw new Error("invalid range ("+from+", "+to+") or no bytes requested!");if(to>datalength-1)throw new Error("only "+datalength+" bytes available! programmer error!");var xhr=new XMLHttpRequest;xhr.open("GET",url,false);if(datalength!==chunkSize)xhr.setRequestHeader("Range","bytes="+from+"-"+to);if(typeof Uint8Array!="undefined")xhr.responseType="arraybuffer";if(xhr.overrideMimeType){xhr.overrideMimeType("text/plain; charset=x-user-defined")}xhr.send(null);if(!(xhr.status>=200&&xhr.status<300||xhr.status===304))throw new Error("Couldn't load "+url+". Status: "+xhr.status);if(xhr.response!==undefined){return new Uint8Array(xhr.response||[])}else{return intArrayFromString(xhr.responseText||"",true)}});var lazyArray=this;lazyArray.setDataGetter((function(chunkNum){var start=chunkNum*chunkSize;var end=(chunkNum+1)*chunkSize-1;end=Math.min(end,datalength-1);if(typeof lazyArray.chunks[chunkNum]==="undefined"){lazyArray.chunks[chunkNum]=doXHR(start,end)}if(typeof lazyArray.chunks[chunkNum]==="undefined")throw new Error("doXHR failed!");return lazyArray.chunks[chunkNum]}));if(usesGzip||!datalength){chunkSize=datalength=1;datalength=this.getter(0).length;chunkSize=datalength;console.log("LazyFiles on gzip forces download of the whole file when length is accessed")}this._length=datalength;this._chunkSize=chunkSize;this.lengthKnown=true};if(typeof XMLHttpRequest!=="undefined"){if(!ENVIRONMENT_IS_WORKER)throw"Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";var lazyArray=new LazyUint8Array;Object.defineProperties(lazyArray,{length:{get:(function(){if(!this.lengthKnown){this.cacheLength()}return this._length})},chunkSize:{get:(function(){if(!this.lengthKnown){this.cacheLength()}return this._chunkSize})}});var properties={isDevice:false,contents:lazyArray}}else{var properties={isDevice:false,url:url}}var node=FS.createFile(parent,name,properties,canRead,canWrite);if(properties.contents){node.contents=properties.contents}else if(properties.url){node.contents=null;node.url=properties.url}Object.defineProperties(node,{usedBytes:{get:(function(){return this.contents.length})}});var stream_ops={};var keys=Object.keys(node.stream_ops);keys.forEach((function(key){var fn=node.stream_ops[key];stream_ops[key]=function forceLoadLazyFile(){if(!FS.forceLoadFile(node)){throw new FS.ErrnoError(5)}return fn.apply(null,arguments)}}));stream_ops.read=function stream_ops_read(stream,buffer,offset,length,position){if(!FS.forceLoadFile(node)){throw new FS.ErrnoError(5)}var contents=stream.node.contents;if(position>=contents.length)return 0;var size=Math.min(contents.length-position,length);assert(size>=0);if(contents.slice){for(var i=0;i<size;i++){buffer[offset+i]=contents[position+i]}}else{for(var i=0;i<size;i++){buffer[offset+i]=contents.get(position+i)}}return size};node.stream_ops=stream_ops;return node}),createPreloadedFile:(function(parent,name,url,canRead,canWrite,onload,onerror,dontCreateFile,canOwn,preFinish){Browser.init();var fullname=name?PATH.resolve(PATH.join2(parent,name)):parent;var dep=getUniqueRunDependency("cp "+fullname);function processData(byteArray){function finish(byteArray){if(preFinish)preFinish();if(!dontCreateFile){FS.createDataFile(parent,name,byteArray,canRead,canWrite,canOwn)}if(onload)onload();removeRunDependency(dep)}var handled=false;Module["preloadPlugins"].forEach((function(plugin){if(handled)return;if(plugin["canHandle"](fullname)){plugin["handle"](byteArray,fullname,finish,(function(){if(onerror)onerror();removeRunDependency(dep)}));handled=true}}));if(!handled)finish(byteArray)}addRunDependency(dep);if(typeof url=="string"){Browser.asyncLoad(url,(function(byteArray){processData(byteArray)}),onerror)}else{processData(url)}}),indexedDB:(function(){return window.indexedDB||window.mozIndexedDB||window.webkitIndexedDB||window.msIndexedDB}),DB_NAME:(function(){return"EM_FS_"+window.location.pathname}),DB_VERSION:20,DB_STORE_NAME:"FILE_DATA",saveFilesToDB:(function(paths,onload,onerror){onload=onload||(function(){});onerror=onerror||(function(){});var indexedDB=FS.indexedDB();try{var openRequest=indexedDB.open(FS.DB_NAME(),FS.DB_VERSION)}catch(e){return onerror(e)}openRequest.onupgradeneeded=function openRequest_onupgradeneeded(){console.log("creating db");var db=openRequest.result;db.createObjectStore(FS.DB_STORE_NAME)};openRequest.onsuccess=function openRequest_onsuccess(){var db=openRequest.result;var transaction=db.transaction([FS.DB_STORE_NAME],"readwrite");var files=transaction.objectStore(FS.DB_STORE_NAME);var ok=0,fail=0,total=paths.length;function finish(){if(fail==0)onload();else onerror()}paths.forEach((function(path){var putRequest=files.put(FS.analyzePath(path).object.contents,path);putRequest.onsuccess=function putRequest_onsuccess(){ok++;if(ok+fail==total)finish()};putRequest.onerror=function putRequest_onerror(){fail++;if(ok+fail==total)finish()}}));transaction.onerror=onerror};openRequest.onerror=onerror}),loadFilesFromDB:(function(paths,onload,onerror){onload=onload||(function(){});onerror=onerror||(function(){});var indexedDB=FS.indexedDB();try{var openRequest=indexedDB.open(FS.DB_NAME(),FS.DB_VERSION)}catch(e){return onerror(e)}openRequest.onupgradeneeded=onerror;openRequest.onsuccess=function openRequest_onsuccess(){var db=openRequest.result;try{var transaction=db.transaction([FS.DB_STORE_NAME],"readonly")}catch(e){onerror(e);return}var files=transaction.objectStore(FS.DB_STORE_NAME);var ok=0,fail=0,total=paths.length;function finish(){if(fail==0)onload();else onerror()}paths.forEach((function(path){var getRequest=files.get(path);getRequest.onsuccess=function getRequest_onsuccess(){if(FS.analyzePath(path).exists){FS.unlink(path)}FS.createDataFile(PATH.dirname(path),PATH.basename(path),getRequest.result,true,true,true);ok++;if(ok+fail==total)finish()};getRequest.onerror=function getRequest_onerror(){fail++;if(ok+fail==total)finish()}}));transaction.onerror=onerror};openRequest.onerror=onerror})};var SYSCALLS={DEFAULT_POLLMASK:5,mappings:{},umask:511,calculateAt:(function(dirfd,path){if(path[0]!=="/"){var dir;if(dirfd===-100){dir=FS.cwd()}else{var dirstream=FS.getStream(dirfd);if(!dirstream)throw new FS.ErrnoError(ERRNO_CODES.EBADF);dir=dirstream.path}path=PATH.join2(dir,path)}return path}),doStat:(function(func,path,buf){try{var stat=func(path)}catch(e){if(e&&e.node&&PATH.normalize(path)!==PATH.normalize(FS.getPath(e.node))){return-ERRNO_CODES.ENOTDIR}throw e}SAFE_HEAP_STORE(buf|0,stat.dev|0,4);SAFE_HEAP_STORE(buf+4|0,0|0,4);SAFE_HEAP_STORE(buf+8|0,stat.ino|0,4);SAFE_HEAP_STORE(buf+12|0,stat.mode|0,4);SAFE_HEAP_STORE(buf+16|0,stat.nlink|0,4);SAFE_HEAP_STORE(buf+20|0,stat.uid|0,4);SAFE_HEAP_STORE(buf+24|0,stat.gid|0,4);SAFE_HEAP_STORE(buf+28|0,stat.rdev|0,4);SAFE_HEAP_STORE(buf+32|0,0|0,4);SAFE_HEAP_STORE(buf+36|0,stat.size|0,4);SAFE_HEAP_STORE(buf+40|0,4096|0,4);SAFE_HEAP_STORE(buf+44|0,stat.blocks|0,4);SAFE_HEAP_STORE(buf+48|0,stat.atime.getTime()/1e3|0|0,4);SAFE_HEAP_STORE(buf+52|0,0|0,4);SAFE_HEAP_STORE(buf+56|0,stat.mtime.getTime()/1e3|0|0,4);SAFE_HEAP_STORE(buf+60|0,0|0,4);SAFE_HEAP_STORE(buf+64|0,stat.ctime.getTime()/1e3|0|0,4);SAFE_HEAP_STORE(buf+68|0,0|0,4);SAFE_HEAP_STORE(buf+72|0,stat.ino|0,4);return 0}),doMsync:(function(addr,stream,len,flags){var buffer=new Uint8Array(HEAPU8.subarray(addr,addr+len));FS.msync(stream,buffer,0,len,flags)}),doMkdir:(function(path,mode){path=PATH.normalize(path);if(path[path.length-1]==="/")path=path.substr(0,path.length-1);FS.mkdir(path,mode,0);return 0}),doMknod:(function(path,mode,dev){switch(mode&61440){case 32768:case 8192:case 24576:case 4096:case 49152:break;default:return-ERRNO_CODES.EINVAL}FS.mknod(path,mode,dev);return 0}),doReadlink:(function(path,buf,bufsize){if(bufsize<=0)return-ERRNO_CODES.EINVAL;var ret=FS.readlink(path);var len=Math.min(bufsize,lengthBytesUTF8(ret));var endChar=HEAP8[buf+len];stringToUTF8(ret,buf,bufsize+1);HEAP8[buf+len]=endChar;return len}),doAccess:(function(path,amode){if(amode&~7){return-ERRNO_CODES.EINVAL}var node;var lookup=FS.lookupPath(path,{follow:true});node=lookup.node;var perms="";if(amode&4)perms+="r";if(amode&2)perms+="w";if(amode&1)perms+="x";if(perms&&FS.nodePermissions(node,perms)){return-ERRNO_CODES.EACCES}return 0}),doDup:(function(path,flags,suggestFD){var suggest=FS.getStream(suggestFD);if(suggest)FS.close(suggest);return FS.open(path,flags,0,suggestFD,suggestFD).fd}),doReadv:(function(stream,iov,iovcnt,offset){var ret=0;for(var i=0;i<iovcnt;i++){var ptr=SAFE_HEAP_LOAD(iov+i*8|0,4,0)|0;var len=SAFE_HEAP_LOAD(iov+(i*8+4)|0,4,0)|0;var curr=FS.read(stream,HEAP8,ptr,len,offset);if(curr<0)return-1;ret+=curr;if(curr<len)break}return ret}),doWritev:(function(stream,iov,iovcnt,offset){var ret=0;for(var i=0;i<iovcnt;i++){var ptr=SAFE_HEAP_LOAD(iov+i*8|0,4,0)|0;var len=SAFE_HEAP_LOAD(iov+(i*8+4)|0,4,0)|0;var curr=FS.write(stream,HEAP8,ptr,len,offset);if(curr<0)return-1;ret+=curr}return ret}),varargs:0,get:(function(varargs){SYSCALLS.varargs+=4;var ret=SAFE_HEAP_LOAD(SYSCALLS.varargs-4|0,4,0)|0;return ret}),getStr:(function(){var ret=UTF8ToString(SYSCALLS.get());return ret}),getStreamFromFD:(function(){var stream=FS.getStream(SYSCALLS.get());if(!stream)throw new FS.ErrnoError(ERRNO_CODES.EBADF);return stream}),getSocketFromFD:(function(){var socket=SOCKFS.getSocket(SYSCALLS.get());if(!socket)throw new FS.ErrnoError(ERRNO_CODES.EBADF);return socket}),getSocketAddress:(function(allowNull){var addrp=SYSCALLS.get(),addrlen=SYSCALLS.get();if(allowNull&&addrp===0)return null;var info=__read_sockaddr(addrp,addrlen);if(info.errno)throw new FS.ErrnoError(info.errno);info.addr=DNS.lookup_addr(info.addr)||info.addr;return info}),get64:(function(){var low=SYSCALLS.get(),high=SYSCALLS.get();if(low>=0)assert(high===0);else assert(high===-1);return low}),getZero:(function(){assert(SYSCALLS.get()===0)})};function ___syscall10(which,varargs){SYSCALLS.varargs=varargs;try{var path=SYSCALLS.getStr();FS.unlink(path);return 0}catch(e){if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);return-e.errno}}function ___syscall140(which,varargs){SYSCALLS.varargs=varargs;try{var stream=SYSCALLS.getStreamFromFD(),offset_high=SYSCALLS.get(),offset_low=SYSCALLS.get(),result=SYSCALLS.get(),whence=SYSCALLS.get();var offset=offset_low;FS.llseek(stream,offset,whence);SAFE_HEAP_STORE(result|0,stream.position|0,4);if(stream.getdents&&offset===0&&whence===0)stream.getdents=null;return 0}catch(e){if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);return-e.errno}}function ___syscall145(which,varargs){SYSCALLS.varargs=varargs;try{var stream=SYSCALLS.getStreamFromFD(),iov=SYSCALLS.get(),iovcnt=SYSCALLS.get();return SYSCALLS.doReadv(stream,iov,iovcnt)}catch(e){if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);return-e.errno}}function ___syscall146(which,varargs){SYSCALLS.varargs=varargs;try{var stream=SYSCALLS.getStreamFromFD(),iov=SYSCALLS.get(),iovcnt=SYSCALLS.get();return SYSCALLS.doWritev(stream,iov,iovcnt)}catch(e){if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);return-e.errno}}function ___syscall15(which,varargs){SYSCALLS.varargs=varargs;try{var path=SYSCALLS.getStr(),mode=SYSCALLS.get();FS.chmod(path,mode);return 0}catch(e){if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);return-e.errno}}function ___syscall195(which,varargs){SYSCALLS.varargs=varargs;try{var path=SYSCALLS.getStr(),buf=SYSCALLS.get();return SYSCALLS.doStat(FS.stat,path,buf)}catch(e){if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);return-e.errno}}function ___syscall197(which,varargs){SYSCALLS.varargs=varargs;try{var stream=SYSCALLS.getStreamFromFD(),buf=SYSCALLS.get();return SYSCALLS.doStat(FS.stat,stream.path,buf)}catch(e){if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);return-e.errno}}function ___syscall221(which,varargs){SYSCALLS.varargs=varargs;try{var stream=SYSCALLS.getStreamFromFD(),cmd=SYSCALLS.get();switch(cmd){case 0:{var arg=SYSCALLS.get();if(arg<0){return-ERRNO_CODES.EINVAL}var newStream;newStream=FS.open(stream.path,stream.flags,0,arg);return newStream.fd};case 1:case 2:return 0;case 3:return stream.flags;case 4:{var arg=SYSCALLS.get();stream.flags|=arg;return 0};case 12:case 12:{var arg=SYSCALLS.get();var offset=0;SAFE_HEAP_STORE(arg+offset|0,2|0,2);return 0};case 13:case 14:case 13:case 14:return 0;case 16:case 8:return-ERRNO_CODES.EINVAL;case 9:___setErrNo(ERRNO_CODES.EINVAL);return-1;default:{return-ERRNO_CODES.EINVAL}}}catch(e){if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);return-e.errno}}function ___syscall38(which,varargs){SYSCALLS.varargs=varargs;try{var old_path=SYSCALLS.getStr(),new_path=SYSCALLS.getStr();FS.rename(old_path,new_path);return 0}catch(e){if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);return-e.errno}}function ___syscall40(which,varargs){SYSCALLS.varargs=varargs;try{var path=SYSCALLS.getStr();FS.rmdir(path);return 0}catch(e){if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);return-e.errno}}function ___syscall5(which,varargs){SYSCALLS.varargs=varargs;try{var pathname=SYSCALLS.getStr(),flags=SYSCALLS.get(),mode=SYSCALLS.get();var stream=FS.open(pathname,flags,mode);return stream.fd}catch(e){if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);return-e.errno}}function ___syscall54(which,varargs){SYSCALLS.varargs=varargs;try{var stream=SYSCALLS.getStreamFromFD(),op=SYSCALLS.get();switch(op){case 21509:case 21505:{if(!stream.tty)return-ERRNO_CODES.ENOTTY;return 0};case 21510:case 21511:case 21512:case 21506:case 21507:case 21508:{if(!stream.tty)return-ERRNO_CODES.ENOTTY;return 0};case 21519:{if(!stream.tty)return-ERRNO_CODES.ENOTTY;var argp=SYSCALLS.get();SAFE_HEAP_STORE(argp|0,0|0,4);return 0};case 21520:{if(!stream.tty)return-ERRNO_CODES.ENOTTY;return-ERRNO_CODES.EINVAL};case 21531:{var argp=SYSCALLS.get();return FS.ioctl(stream,op,argp)};case 21523:{if(!stream.tty)return-ERRNO_CODES.ENOTTY;return 0};case 21524:{if(!stream.tty)return-ERRNO_CODES.ENOTTY;return 0};default:abort("bad ioctl syscall "+op)}}catch(e){if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);return-e.errno}}function ___syscall6(which,varargs){SYSCALLS.varargs=varargs;try{var stream=SYSCALLS.getStreamFromFD();FS.close(stream);return 0}catch(e){if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);return-e.errno}}function ___syscall60(which,varargs){SYSCALLS.varargs=varargs;try{var mask=SYSCALLS.get();var old=SYSCALLS.umask;SYSCALLS.umask=mask;return old}catch(e){if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);return-e.errno}}function ___unlock(){}var ___tm_current=22560;var ___tm_timezone=(stringToUTF8("GMT",22608,4),22608);function _tzset(){if(_tzset.called)return;_tzset.called=true;SAFE_HEAP_STORE(__get_timezone()|0,(new Date).getTimezoneOffset()*60|0,4);var winter=new Date(2e3,0,1);var summer=new Date(2e3,6,1);SAFE_HEAP_STORE(__get_daylight()|0,Number(winter.getTimezoneOffset()!=summer.getTimezoneOffset())|0,4);function extractZone(date){var match=date.toTimeString().match(/\(([A-Za-z ]+)\)$/);return match?match[1]:"GMT"}var winterName=extractZone(winter);var summerName=extractZone(summer);var winterNamePtr=allocate(intArrayFromString(winterName),"i8",ALLOC_NORMAL);var summerNamePtr=allocate(intArrayFromString(summerName),"i8",ALLOC_NORMAL);if(summer.getTimezoneOffset()<winter.getTimezoneOffset()){SAFE_HEAP_STORE(__get_tzname()|0,winterNamePtr|0,4);SAFE_HEAP_STORE(__get_tzname()+4|0,summerNamePtr|0,4)}else{SAFE_HEAP_STORE(__get_tzname()|0,summerNamePtr|0,4);SAFE_HEAP_STORE(__get_tzname()+4|0,winterNamePtr|0,4)}}function _localtime_r(time,tmPtr){_tzset();var date=new Date((SAFE_HEAP_LOAD(time|0,4,0)|0)*1e3);SAFE_HEAP_STORE(tmPtr|0,date.getSeconds()|0,4);SAFE_HEAP_STORE(tmPtr+4|0,date.getMinutes()|0,4);SAFE_HEAP_STORE(tmPtr+8|0,date.getHours()|0,4);SAFE_HEAP_STORE(tmPtr+12|0,date.getDate()|0,4);SAFE_HEAP_STORE(tmPtr+16|0,date.getMonth()|0,4);SAFE_HEAP_STORE(tmPtr+20|0,date.getFullYear()-1900|0,4);SAFE_HEAP_STORE(tmPtr+24|0,date.getDay()|0,4);var start=new Date(date.getFullYear(),0,1);var yday=(date.getTime()-start.getTime())/(1e3*60*60*24)|0;SAFE_HEAP_STORE(tmPtr+28|0,yday|0,4);SAFE_HEAP_STORE(tmPtr+36|0,-(date.getTimezoneOffset()*60)|0,4);var summerOffset=(new Date(2e3,6,1)).getTimezoneOffset();var winterOffset=start.getTimezoneOffset();var dst=(summerOffset!=winterOffset&&date.getTimezoneOffset()==Math.min(winterOffset,summerOffset))|0;SAFE_HEAP_STORE(tmPtr+32|0,dst|0,4);var zonePtr=SAFE_HEAP_LOAD(__get_tzname()+(dst?4:0)|0,4,0)|0;SAFE_HEAP_STORE(tmPtr+40|0,zonePtr|0,4);return tmPtr}function _localtime(time){return _localtime_r(time,___tm_current)}function _emscripten_memcpy_big(dest,src,num){HEAPU8.set(HEAPU8.subarray(src,src+num),dest);return dest}function _mktime(tmPtr){_tzset();var date=new Date((SAFE_HEAP_LOAD(tmPtr+20|0,4,0)|0)+1900,SAFE_HEAP_LOAD(tmPtr+16|0,4,0)|0,SAFE_HEAP_LOAD(tmPtr+12|0,4,0)|0,SAFE_HEAP_LOAD(tmPtr+8|0,4,0)|0,SAFE_HEAP_LOAD(tmPtr+4|0,4,0)|0,SAFE_HEAP_LOAD(tmPtr|0,4,0)|0,0);var dst=SAFE_HEAP_LOAD(tmPtr+32|0,4,0)|0;var guessedOffset=date.getTimezoneOffset();var start=new Date(date.getFullYear(),0,1);var summerOffset=(new Date(2e3,6,1)).getTimezoneOffset();var winterOffset=start.getTimezoneOffset();var dstOffset=Math.min(winterOffset,summerOffset);if(dst<0){SAFE_HEAP_STORE(tmPtr+32|0,Number(summerOffset!=winterOffset&&dstOffset==guessedOffset)|0,4)}else if(dst>0!=(dstOffset==guessedOffset)){var nonDstOffset=Math.max(winterOffset,summerOffset);var trueOffset=dst>0?dstOffset:nonDstOffset;date.setTime(date.getTime()+(trueOffset-guessedOffset)*6e4)}SAFE_HEAP_STORE(tmPtr+24|0,date.getDay()|0,4);var yday=(date.getTime()-start.getTime())/(1e3*60*60*24)|0;SAFE_HEAP_STORE(tmPtr+28|0,yday|0,4);return date.getTime()/1e3|0}function _time(ptr){var ret=Date.now()/1e3|0;if(ptr){SAFE_HEAP_STORE(ptr|0,ret|0,4)}return ret}if(ENVIRONMENT_IS_NODE){_emscripten_get_now=function _emscripten_get_now_actual(){var t=process["hrtime"]();return t[0]*1e3+t[1]/1e6}}else if(typeof dateNow!=="undefined"){_emscripten_get_now=dateNow}else if(typeof self==="object"&&self["performance"]&&typeof self["performance"]["now"]==="function"){_emscripten_get_now=(function(){return self["performance"]["now"]()})}else if(typeof performance==="object"&&typeof performance["now"]==="function"){_emscripten_get_now=(function(){return performance["now"]()})}else{_emscripten_get_now=Date.now}FS.staticInit();__ATINIT__.unshift((function(){if(!Module["noFSInit"]&&!FS.init.initialized)FS.init()}));__ATMAIN__.push((function(){FS.ignorePermissions=false}));__ATEXIT__.push((function(){FS.quit()}));__ATINIT__.unshift((function(){TTY.init()}));__ATEXIT__.push((function(){TTY.shutdown()}));if(ENVIRONMENT_IS_NODE){var fs=frozenFs;var NODEJS_PATH=__webpack_require__(2);NODEFS.staticInit()}if(ENVIRONMENT_IS_NODE){var _wrapNodeError=(function(func){return(function(){try{return func.apply(this,arguments)}catch(e){if(!e.code)throw e;throw new FS.ErrnoError(ERRNO_CODES[e.code])}})});var VFS=Object.assign({},FS);for(var _key in NODERAWFS)FS[_key]=_wrapNodeError(NODERAWFS[_key])}else{throw new Error("NODERAWFS is currently only supported on Node.js environment.")}function intArrayFromString(stringy,dontAddNull,length){var len=length>0?length:lengthBytesUTF8(stringy)+1;var u8array=new Array(len);var numBytesWritten=stringToUTF8Array(stringy,u8array,0,u8array.length);if(dontAddNull)u8array.length=numBytesWritten;return u8array}var decodeBase64=typeof atob==="function"?atob:(function(input){var keyStr="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";var output="";var chr1,chr2,chr3;var enc1,enc2,enc3,enc4;var i=0;input=input.replace(/[^A-Za-z0-9\+\/\=]/g,"");do{enc1=keyStr.indexOf(input.charAt(i++));enc2=keyStr.indexOf(input.charAt(i++));enc3=keyStr.indexOf(input.charAt(i++));enc4=keyStr.indexOf(input.charAt(i++));chr1=enc1<<2|enc2>>4;chr2=(enc2&15)<<4|enc3>>2;chr3=(enc3&3)<<6|enc4;output=output+String.fromCharCode(chr1);if(enc3!==64){output=output+String.fromCharCode(chr2)}if(enc4!==64){output=output+String.fromCharCode(chr3)}}while(i<input.length);return output});function intArrayFromBase64(s){if(typeof ENVIRONMENT_IS_NODE==="boolean"&&ENVIRONMENT_IS_NODE){var buf;try{buf=Buffer.from(s,"base64")}catch(_){buf=new Buffer(s,"base64")}return new Uint8Array(buf.buffer,buf.byteOffset,buf.byteLength)}try{var decoded=decodeBase64(s);var bytes=new Uint8Array(decoded.length);for(var i=0;i<decoded.length;++i){bytes[i]=decoded.charCodeAt(i)}return bytes}catch(_){throw new Error("Converting base64 string to bytes failed.")}}function tryParseAsDataURI(filename){if(!isDataURI(filename)){return}return intArrayFromBase64(filename.slice(dataURIPrefix.length))}function nullFunc_ii(x){err("Invalid function pointer called with signature 'ii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");err("Build with ASSERTIONS=2 for more info.");abort(x)}function nullFunc_iii(x){err("Invalid function pointer called with signature 'iii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");err("Build with ASSERTIONS=2 for more info.");abort(x)}function nullFunc_iiii(x){err("Invalid function pointer called with signature 'iiii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");err("Build with ASSERTIONS=2 for more info.");abort(x)}function nullFunc_iiiiii(x){err("Invalid function pointer called with signature 'iiiiii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");err("Build with ASSERTIONS=2 for more info.");abort(x)}function nullFunc_iiij(x){err("Invalid function pointer called with signature 'iiij'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");err("Build with ASSERTIONS=2 for more info.");abort(x)}function nullFunc_jiiiji(x){err("Invalid function pointer called with signature 'jiiiji'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");err("Build with ASSERTIONS=2 for more info.");abort(x)}function nullFunc_jiiji(x){err("Invalid function pointer called with signature 'jiiji'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");err("Build with ASSERTIONS=2 for more info.");abort(x)}function nullFunc_vi(x){err("Invalid function pointer called with signature 'vi'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");err("Build with ASSERTIONS=2 for more info.");abort(x)}function nullFunc_vidi(x){err("Invalid function pointer called with signature 'vidi'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");err("Build with ASSERTIONS=2 for more info.");abort(x)}function nullFunc_vii(x){err("Invalid function pointer called with signature 'vii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");err("Build with ASSERTIONS=2 for more info.");abort(x)}Module["wasmTableSize"]=55;Module["wasmMaxTableSize"]=55;Module.asmGlobalArg={};Module.asmLibraryArg={"O":enlargeMemory,"N":getTotalMemory,"e":setTempRet0,"E":abortOnCannotGrowMemory,"b":abortStackOverflow,"c":segfault,"d":alignfault,"s":nullFunc_ii,"r":nullFunc_iii,"q":nullFunc_iiii,"p":nullFunc_iiiiii,"M":nullFunc_iiij,"L":nullFunc_jiiiji,"K":nullFunc_jiiji,"J":nullFunc_vi,"I":nullFunc_vidi,"H":nullFunc_vii,"G":___buildEnvironment,"F":___clock_gettime,"i":___lock,"o":___setErrNo,"D":___syscall10,"C":___syscall140,"B":___syscall145,"n":___syscall146,"A":___syscall15,"m":___syscall195,"z":___syscall197,"f":___syscall221,"y":___syscall38,"x":___syscall40,"l":___syscall5,"k":___syscall54,"h":___syscall6,"w":___syscall60,"g":___unlock,"v":_emscripten_memcpy_big,"u":_localtime,"t":_mktime,"j":_time,"a":DYNAMICTOP_PTR};var asm=Module["asm"](Module.asmGlobalArg,Module.asmLibraryArg,buffer);var real____emscripten_environ_constructor=asm["___emscripten_environ_constructor"];asm["___emscripten_environ_constructor"]=(function(){assert(runtimeInitialized,"you need to wait for the runtime to be ready (e.g. wait for main() to be called)");assert(!runtimeExited,"the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");return real____emscripten_environ_constructor.apply(null,arguments)});var real____errno_location=asm["___errno_location"];asm["___errno_location"]=(function(){assert(runtimeInitialized,"you need to wait for the runtime to be ready (e.g. wait for main() to be called)");assert(!runtimeExited,"the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");return real____errno_location.apply(null,arguments)});var real___get_daylight=asm["__get_daylight"];asm["__get_daylight"]=(function(){assert(runtimeInitialized,"you need to wait for the runtime to be ready (e.g. wait for main() to be called)");assert(!runtimeExited,"the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");return real___get_daylight.apply(null,arguments)});var real___get_timezone=asm["__get_timezone"];asm["__get_timezone"]=(function(){assert(runtimeInitialized,"you need to wait for the runtime to be ready (e.g. wait for main() to be called)");assert(!runtimeExited,"the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");return real___get_timezone.apply(null,arguments)});var real___get_tzname=asm["__get_tzname"];asm["__get_tzname"]=(function(){assert(runtimeInitialized,"you need to wait for the runtime to be ready (e.g. wait for main() to be called)");assert(!runtimeExited,"the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");return real___get_tzname.apply(null,arguments)});var real__fflush=asm["_fflush"];asm["_fflush"]=(function(){assert(runtimeInitialized,"you need to wait for the runtime to be ready (e.g. wait for main() to be called)");assert(!runtimeExited,"the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");return real__fflush.apply(null,arguments)});var real__free=asm["_free"];asm["_free"]=(function(){assert(runtimeInitialized,"you need to wait for the runtime to be ready (e.g. wait for main() to be called)");assert(!runtimeExited,"the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");return real__free.apply(null,arguments)});var real__llvm_bswap_i32=asm["_llvm_bswap_i32"];asm["_llvm_bswap_i32"]=(function(){assert(runtimeInitialized,"you need to wait for the runtime to be ready (e.g. wait for main() to be called)");assert(!runtimeExited,"the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");return real__llvm_bswap_i32.apply(null,arguments)});var real__malloc=asm["_malloc"];asm["_malloc"]=(function(){assert(runtimeInitialized,"you need to wait for the runtime to be ready (e.g. wait for main() to be called)");assert(!runtimeExited,"the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");return real__malloc.apply(null,arguments)});var real__sbrk=asm["_sbrk"];asm["_sbrk"]=(function(){assert(runtimeInitialized,"you need to wait for the runtime to be ready (e.g. wait for main() to be called)");assert(!runtimeExited,"the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");return real__sbrk.apply(null,arguments)});var real__zip_close=asm["_zip_close"];asm["_zip_close"]=(function(){assert(runtimeInitialized,"you need to wait for the runtime to be ready (e.g. wait for main() to be called)");assert(!runtimeExited,"the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");return real__zip_close.apply(null,arguments)});var real__zip_dir_add=asm["_zip_dir_add"];asm["_zip_dir_add"]=(function(){assert(runtimeInitialized,"you need to wait for the runtime to be ready (e.g. wait for main() to be called)");assert(!runtimeExited,"the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");return real__zip_dir_add.apply(null,arguments)});var real__zip_discard=asm["_zip_discard"];asm["_zip_discard"]=(function(){assert(runtimeInitialized,"you need to wait for the runtime to be ready (e.g. wait for main() to be called)");assert(!runtimeExited,"the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");return real__zip_discard.apply(null,arguments)});var real__zip_error_init_with_code=asm["_zip_error_init_with_code"];asm["_zip_error_init_with_code"]=(function(){assert(runtimeInitialized,"you need to wait for the runtime to be ready (e.g. wait for main() to be called)");assert(!runtimeExited,"the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");return real__zip_error_init_with_code.apply(null,arguments)});var real__zip_error_strerror=asm["_zip_error_strerror"];asm["_zip_error_strerror"]=(function(){assert(runtimeInitialized,"you need to wait for the runtime to be ready (e.g. wait for main() to be called)");assert(!runtimeExited,"the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");return real__zip_error_strerror.apply(null,arguments)});var real__zip_fclose=asm["_zip_fclose"];asm["_zip_fclose"]=(function(){assert(runtimeInitialized,"you need to wait for the runtime to be ready (e.g. wait for main() to be called)");assert(!runtimeExited,"the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");return real__zip_fclose.apply(null,arguments)});var real__zip_file_add=asm["_zip_file_add"];asm["_zip_file_add"]=(function(){assert(runtimeInitialized,"you need to wait for the runtime to be ready (e.g. wait for main() to be called)");assert(!runtimeExited,"the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");return real__zip_file_add.apply(null,arguments)});var real__zip_file_get_error=asm["_zip_file_get_error"];asm["_zip_file_get_error"]=(function(){assert(runtimeInitialized,"you need to wait for the runtime to be ready (e.g. wait for main() to be called)");assert(!runtimeExited,"the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");return real__zip_file_get_error.apply(null,arguments)});var real__zip_file_get_external_attributes=asm["_zip_file_get_external_attributes"];asm["_zip_file_get_external_attributes"]=(function(){assert(runtimeInitialized,"you need to wait for the runtime to be ready (e.g. wait for main() to be called)");assert(!runtimeExited,"the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");return real__zip_file_get_external_attributes.apply(null,arguments)});var real__zip_file_set_external_attributes=asm["_zip_file_set_external_attributes"];asm["_zip_file_set_external_attributes"]=(function(){assert(runtimeInitialized,"you need to wait for the runtime to be ready (e.g. wait for main() to be called)");assert(!runtimeExited,"the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");return real__zip_file_set_external_attributes.apply(null,arguments)});var real__zip_file_set_mtime=asm["_zip_file_set_mtime"];asm["_zip_file_set_mtime"]=(function(){assert(runtimeInitialized,"you need to wait for the runtime to be ready (e.g. wait for main() to be called)");assert(!runtimeExited,"the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");return real__zip_file_set_mtime.apply(null,arguments)});var real__zip_fopen=asm["_zip_fopen"];asm["_zip_fopen"]=(function(){assert(runtimeInitialized,"you need to wait for the runtime to be ready (e.g. wait for main() to be called)");assert(!runtimeExited,"the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");return real__zip_fopen.apply(null,arguments)});var real__zip_fopen_index=asm["_zip_fopen_index"];asm["_zip_fopen_index"]=(function(){assert(runtimeInitialized,"you need to wait for the runtime to be ready (e.g. wait for main() to be called)");assert(!runtimeExited,"the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");return real__zip_fopen_index.apply(null,arguments)});var real__zip_fread=asm["_zip_fread"];asm["_zip_fread"]=(function(){assert(runtimeInitialized,"you need to wait for the runtime to be ready (e.g. wait for main() to be called)");assert(!runtimeExited,"the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");return real__zip_fread.apply(null,arguments)});var real__zip_get_error=asm["_zip_get_error"];asm["_zip_get_error"]=(function(){assert(runtimeInitialized,"you need to wait for the runtime to be ready (e.g. wait for main() to be called)");assert(!runtimeExited,"the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");return real__zip_get_error.apply(null,arguments)});var real__zip_get_name=asm["_zip_get_name"];asm["_zip_get_name"]=(function(){assert(runtimeInitialized,"you need to wait for the runtime to be ready (e.g. wait for main() to be called)");assert(!runtimeExited,"the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");return real__zip_get_name.apply(null,arguments)});var real__zip_get_num_entries=asm["_zip_get_num_entries"];asm["_zip_get_num_entries"]=(function(){assert(runtimeInitialized,"you need to wait for the runtime to be ready (e.g. wait for main() to be called)");assert(!runtimeExited,"the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");return real__zip_get_num_entries.apply(null,arguments)});var real__zip_name_locate=asm["_zip_name_locate"];asm["_zip_name_locate"]=(function(){assert(runtimeInitialized,"you need to wait for the runtime to be ready (e.g. wait for main() to be called)");assert(!runtimeExited,"the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");return real__zip_name_locate.apply(null,arguments)});var real__zip_open=asm["_zip_open"];asm["_zip_open"]=(function(){assert(runtimeInitialized,"you need to wait for the runtime to be ready (e.g. wait for main() to be called)");assert(!runtimeExited,"the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");return real__zip_open.apply(null,arguments)});var real__zip_source_buffer=asm["_zip_source_buffer"];asm["_zip_source_buffer"]=(function(){assert(runtimeInitialized,"you need to wait for the runtime to be ready (e.g. wait for main() to be called)");assert(!runtimeExited,"the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");return real__zip_source_buffer.apply(null,arguments)});var real__zip_stat=asm["_zip_stat"];asm["_zip_stat"]=(function(){assert(runtimeInitialized,"you need to wait for the runtime to be ready (e.g. wait for main() to be called)");assert(!runtimeExited,"the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");return real__zip_stat.apply(null,arguments)});var real__zip_stat_index=asm["_zip_stat_index"];asm["_zip_stat_index"]=(function(){assert(runtimeInitialized,"you need to wait for the runtime to be ready (e.g. wait for main() to be called)");assert(!runtimeExited,"the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");return real__zip_stat_index.apply(null,arguments)});var real__zipstruct_error=asm["_zipstruct_error"];asm["_zipstruct_error"]=(function(){assert(runtimeInitialized,"you need to wait for the runtime to be ready (e.g. wait for main() to be called)");assert(!runtimeExited,"the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");return real__zipstruct_error.apply(null,arguments)});var real__zipstruct_errorS=asm["_zipstruct_errorS"];asm["_zipstruct_errorS"]=(function(){assert(runtimeInitialized,"you need to wait for the runtime to be ready (e.g. wait for main() to be called)");assert(!runtimeExited,"the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");return real__zipstruct_errorS.apply(null,arguments)});var real__zipstruct_stat=asm["_zipstruct_stat"];asm["_zipstruct_stat"]=(function(){assert(runtimeInitialized,"you need to wait for the runtime to be ready (e.g. wait for main() to be called)");assert(!runtimeExited,"the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");return real__zipstruct_stat.apply(null,arguments)});var real__zipstruct_statS=asm["_zipstruct_statS"];asm["_zipstruct_statS"]=(function(){assert(runtimeInitialized,"you need to wait for the runtime to be ready (e.g. wait for main() to be called)");assert(!runtimeExited,"the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");return real__zipstruct_statS.apply(null,arguments)});var real__zipstruct_stat_index=asm["_zipstruct_stat_index"];asm["_zipstruct_stat_index"]=(function(){assert(runtimeInitialized,"you need to wait for the runtime to be ready (e.g. wait for main() to be called)");assert(!runtimeExited,"the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");return real__zipstruct_stat_index.apply(null,arguments)});var real__zipstruct_stat_mtime=asm["_zipstruct_stat_mtime"];asm["_zipstruct_stat_mtime"]=(function(){assert(runtimeInitialized,"you need to wait for the runtime to be ready (e.g. wait for main() to be called)");assert(!runtimeExited,"the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");return real__zipstruct_stat_mtime.apply(null,arguments)});var real__zipstruct_stat_name=asm["_zipstruct_stat_name"];asm["_zipstruct_stat_name"]=(function(){assert(runtimeInitialized,"you need to wait for the runtime to be ready (e.g. wait for main() to be called)");assert(!runtimeExited,"the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");return real__zipstruct_stat_name.apply(null,arguments)});var real__zipstruct_stat_size=asm["_zipstruct_stat_size"];asm["_zipstruct_stat_size"]=(function(){assert(runtimeInitialized,"you need to wait for the runtime to be ready (e.g. wait for main() to be called)");assert(!runtimeExited,"the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");return real__zipstruct_stat_size.apply(null,arguments)});var real_establishStackSpace=asm["establishStackSpace"];asm["establishStackSpace"]=(function(){assert(runtimeInitialized,"you need to wait for the runtime to be ready (e.g. wait for main() to be called)");assert(!runtimeExited,"the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");return real_establishStackSpace.apply(null,arguments)});var real_setDynamicTop=asm["setDynamicTop"];asm["setDynamicTop"]=(function(){assert(runtimeInitialized,"you need to wait for the runtime to be ready (e.g. wait for main() to be called)");assert(!runtimeExited,"the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");return real_setDynamicTop.apply(null,arguments)});var real_setThrew=asm["setThrew"];asm["setThrew"]=(function(){assert(runtimeInitialized,"you need to wait for the runtime to be ready (e.g. wait for main() to be called)");assert(!runtimeExited,"the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");return real_setThrew.apply(null,arguments)});var real_stackAlloc=asm["stackAlloc"];asm["stackAlloc"]=(function(){assert(runtimeInitialized,"you need to wait for the runtime to be ready (e.g. wait for main() to be called)");assert(!runtimeExited,"the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");return real_stackAlloc.apply(null,arguments)});var real_stackRestore=asm["stackRestore"];asm["stackRestore"]=(function(){assert(runtimeInitialized,"you need to wait for the runtime to be ready (e.g. wait for main() to be called)");assert(!runtimeExited,"the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");return real_stackRestore.apply(null,arguments)});var real_stackSave=asm["stackSave"];asm["stackSave"]=(function(){assert(runtimeInitialized,"you need to wait for the runtime to be ready (e.g. wait for main() to be called)");assert(!runtimeExited,"the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");return real_stackSave.apply(null,arguments)});var ___emscripten_environ_constructor=Module["___emscripten_environ_constructor"]=asm["P"];var ___errno_location=Module["___errno_location"]=asm["Q"];var __get_daylight=Module["__get_daylight"]=asm["R"];var __get_timezone=Module["__get_timezone"]=asm["S"];var __get_tzname=Module["__get_tzname"]=asm["T"];var _fflush=Module["_fflush"]=asm["U"];var _free=Module["_free"]=asm["V"];var _llvm_bswap_i32=Module["_llvm_bswap_i32"]=asm["W"];var _malloc=Module["_malloc"]=asm["X"];var _sbrk=Module["_sbrk"]=asm["Y"];var _zip_close=Module["_zip_close"]=asm["Z"];var _zip_dir_add=Module["_zip_dir_add"]=asm["_"];var _zip_discard=Module["_zip_discard"]=asm["$"];var _zip_error_init_with_code=Module["_zip_error_init_with_code"]=asm["aa"];var _zip_error_strerror=Module["_zip_error_strerror"]=asm["ba"];var _zip_fclose=Module["_zip_fclose"]=asm["ca"];var _zip_file_add=Module["_zip_file_add"]=asm["da"];var _zip_file_get_error=Module["_zip_file_get_error"]=asm["ea"];var _zip_file_get_external_attributes=Module["_zip_file_get_external_attributes"]=asm["fa"];var _zip_file_set_external_attributes=Module["_zip_file_set_external_attributes"]=asm["ga"];var _zip_file_set_mtime=Module["_zip_file_set_mtime"]=asm["ha"];var _zip_fopen=Module["_zip_fopen"]=asm["ia"];var _zip_fopen_index=Module["_zip_fopen_index"]=asm["ja"];var _zip_fread=Module["_zip_fread"]=asm["ka"];var _zip_get_error=Module["_zip_get_error"]=asm["la"];var _zip_get_name=Module["_zip_get_name"]=asm["ma"];var _zip_get_num_entries=Module["_zip_get_num_entries"]=asm["na"];var _zip_name_locate=Module["_zip_name_locate"]=asm["oa"];var _zip_open=Module["_zip_open"]=asm["pa"];var _zip_source_buffer=Module["_zip_source_buffer"]=asm["qa"];var _zip_stat=Module["_zip_stat"]=asm["ra"];var _zip_stat_index=Module["_zip_stat_index"]=asm["sa"];var _zipstruct_error=Module["_zipstruct_error"]=asm["ta"];var _zipstruct_errorS=Module["_zipstruct_errorS"]=asm["ua"];var _zipstruct_stat=Module["_zipstruct_stat"]=asm["va"];var _zipstruct_statS=Module["_zipstruct_statS"]=asm["wa"];var _zipstruct_stat_index=Module["_zipstruct_stat_index"]=asm["xa"];var _zipstruct_stat_mtime=Module["_zipstruct_stat_mtime"]=asm["ya"];var _zipstruct_stat_name=Module["_zipstruct_stat_name"]=asm["za"];var _zipstruct_stat_size=Module["_zipstruct_stat_size"]=asm["Aa"];var establishStackSpace=Module["establishStackSpace"]=asm["Ca"];var setDynamicTop=Module["setDynamicTop"]=asm["Da"];var setThrew=Module["setThrew"]=asm["Ea"];var stackAlloc=Module["stackAlloc"]=asm["Fa"];var stackRestore=Module["stackRestore"]=asm["Ga"];var stackSave=Module["stackSave"]=asm["Ha"];var dynCall_vi=Module["dynCall_vi"]=asm["Ba"];Module["asm"]=asm;if(!Module["intArrayFromString"])Module["intArrayFromString"]=(function(){abort("'intArrayFromString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")});if(!Module["intArrayToString"])Module["intArrayToString"]=(function(){abort("'intArrayToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")});if(!Module["ccall"])Module["ccall"]=(function(){abort("'ccall' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")});Module["cwrap"]=cwrap;if(!Module["setValue"])Module["setValue"]=(function(){abort("'setValue' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")});Module["getValue"]=getValue;if(!Module["allocate"])Module["allocate"]=(function(){abort("'allocate' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")});if(!Module["getMemory"])Module["getMemory"]=(function(){abort("'getMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you")});if(!Module["Pointer_stringify"])Module["Pointer_stringify"]=(function(){abort("'Pointer_stringify' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")});if(!Module["AsciiToString"])Module["AsciiToString"]=(function(){abort("'AsciiToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")});if(!Module["stringToAscii"])Module["stringToAscii"]=(function(){abort("'stringToAscii' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")});if(!Module["UTF8ArrayToString"])Module["UTF8ArrayToString"]=(function(){abort("'UTF8ArrayToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")});if(!Module["UTF8ToString"])Module["UTF8ToString"]=(function(){abort("'UTF8ToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")});if(!Module["stringToUTF8Array"])Module["stringToUTF8Array"]=(function(){abort("'stringToUTF8Array' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")});if(!Module["stringToUTF8"])Module["stringToUTF8"]=(function(){abort("'stringToUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")});if(!Module["lengthBytesUTF8"])Module["lengthBytesUTF8"]=(function(){abort("'lengthBytesUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")});if(!Module["UTF16ToString"])Module["UTF16ToString"]=(function(){abort("'UTF16ToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")});if(!Module["stringToUTF16"])Module["stringToUTF16"]=(function(){abort("'stringToUTF16' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")});if(!Module["lengthBytesUTF16"])Module["lengthBytesUTF16"]=(function(){abort("'lengthBytesUTF16' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")});if(!Module["UTF32ToString"])Module["UTF32ToString"]=(function(){abort("'UTF32ToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")});if(!Module["stringToUTF32"])Module["stringToUTF32"]=(function(){abort("'stringToUTF32' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")});if(!Module["lengthBytesUTF32"])Module["lengthBytesUTF32"]=(function(){abort("'lengthBytesUTF32' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")});if(!Module["allocateUTF8"])Module["allocateUTF8"]=(function(){abort("'allocateUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")});if(!Module["stackTrace"])Module["stackTrace"]=(function(){abort("'stackTrace' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")});if(!Module["addOnPreRun"])Module["addOnPreRun"]=(function(){abort("'addOnPreRun' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")});if(!Module["addOnInit"])Module["addOnInit"]=(function(){abort("'addOnInit' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")});if(!Module["addOnPreMain"])Module["addOnPreMain"]=(function(){abort("'addOnPreMain' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")});if(!Module["addOnExit"])Module["addOnExit"]=(function(){abort("'addOnExit' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")});if(!Module["addOnPostRun"])Module["addOnPostRun"]=(function(){abort("'addOnPostRun' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")});if(!Module["writeStringToMemory"])Module["writeStringToMemory"]=(function(){abort("'writeStringToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")});if(!Module["writeArrayToMemory"])Module["writeArrayToMemory"]=(function(){abort("'writeArrayToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")});if(!Module["writeAsciiToMemory"])Module["writeAsciiToMemory"]=(function(){abort("'writeAsciiToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")});if(!Module["addRunDependency"])Module["addRunDependency"]=(function(){abort("'addRunDependency' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you")});if(!Module["removeRunDependency"])Module["removeRunDependency"]=(function(){abort("'removeRunDependency' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you")});if(!Module["ENV"])Module["ENV"]=(function(){abort("'ENV' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")});if(!Module["FS"])Module["FS"]=(function(){abort("'FS' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")});if(!Module["FS_createFolder"])Module["FS_createFolder"]=(function(){abort("'FS_createFolder' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you")});if(!Module["FS_createPath"])Module["FS_createPath"]=(function(){abort("'FS_createPath' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you")});if(!Module["FS_createDataFile"])Module["FS_createDataFile"]=(function(){abort("'FS_createDataFile' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you")});if(!Module["FS_createPreloadedFile"])Module["FS_createPreloadedFile"]=(function(){abort("'FS_createPreloadedFile' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you")});if(!Module["FS_createLazyFile"])Module["FS_createLazyFile"]=(function(){abort("'FS_createLazyFile' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you")});if(!Module["FS_createLink"])Module["FS_createLink"]=(function(){abort("'FS_createLink' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you")});if(!Module["FS_createDevice"])Module["FS_createDevice"]=(function(){abort("'FS_createDevice' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you")});if(!Module["FS_unlink"])Module["FS_unlink"]=(function(){abort("'FS_unlink' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you")});if(!Module["GL"])Module["GL"]=(function(){abort("'GL' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")});if(!Module["dynamicAlloc"])Module["dynamicAlloc"]=(function(){abort("'dynamicAlloc' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")});if(!Module["warnOnce"])Module["warnOnce"]=(function(){abort("'warnOnce' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")});if(!Module["loadDynamicLibrary"])Module["loadDynamicLibrary"]=(function(){abort("'loadDynamicLibrary' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")});if(!Module["loadWebAssemblyModule"])Module["loadWebAssemblyModule"]=(function(){abort("'loadWebAssemblyModule' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")});if(!Module["getLEB"])Module["getLEB"]=(function(){abort("'getLEB' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")});if(!Module["getFunctionTables"])Module["getFunctionTables"]=(function(){abort("'getFunctionTables' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")});if(!Module["alignFunctionTables"])Module["alignFunctionTables"]=(function(){abort("'alignFunctionTables' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")});if(!Module["registerFunctions"])Module["registerFunctions"]=(function(){abort("'registerFunctions' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")});if(!Module["addFunction"])Module["addFunction"]=(function(){abort("'addFunction' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")});if(!Module["removeFunction"])Module["removeFunction"]=(function(){abort("'removeFunction' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")});if(!Module["getFuncWrapper"])Module["getFuncWrapper"]=(function(){abort("'getFuncWrapper' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")});if(!Module["prettyPrint"])Module["prettyPrint"]=(function(){abort("'prettyPrint' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")});if(!Module["makeBigInt"])Module["makeBigInt"]=(function(){abort("'makeBigInt' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")});if(!Module["dynCall"])Module["dynCall"]=(function(){abort("'dynCall' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")});if(!Module["getCompilerSetting"])Module["getCompilerSetting"]=(function(){abort("'getCompilerSetting' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")});if(!Module["stackSave"])Module["stackSave"]=(function(){abort("'stackSave' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")});if(!Module["stackRestore"])Module["stackRestore"]=(function(){abort("'stackRestore' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")});if(!Module["stackAlloc"])Module["stackAlloc"]=(function(){abort("'stackAlloc' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")});if(!Module["establishStackSpace"])Module["establishStackSpace"]=(function(){abort("'establishStackSpace' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")});if(!Module["print"])Module["print"]=(function(){abort("'print' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")});if(!Module["printErr"])Module["printErr"]=(function(){abort("'printErr' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")});if(!Module["getTempRet0"])Module["getTempRet0"]=(function(){abort("'getTempRet0' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")});if(!Module["setTempRet0"])Module["setTempRet0"]=(function(){abort("'setTempRet0' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")});if(!Module["intArrayFromBase64"])Module["intArrayFromBase64"]=(function(){abort("'intArrayFromBase64' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")});if(!Module["tryParseAsDataURI"])Module["tryParseAsDataURI"]=(function(){abort("'tryParseAsDataURI' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")});if(!Module["ALLOC_NORMAL"])Object.defineProperty(Module,"ALLOC_NORMAL",{get:(function(){abort("'ALLOC_NORMAL' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")})});if(!Module["ALLOC_STACK"])Object.defineProperty(Module,"ALLOC_STACK",{get:(function(){abort("'ALLOC_STACK' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")})});if(!Module["ALLOC_DYNAMIC"])Object.defineProperty(Module,"ALLOC_DYNAMIC",{get:(function(){abort("'ALLOC_DYNAMIC' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")})});if(!Module["ALLOC_NONE"])Object.defineProperty(Module,"ALLOC_NONE",{get:(function(){abort("'ALLOC_NONE' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")})});function ExitStatus(status){this.name="ExitStatus";this.message="Program terminated with exit("+status+")";this.status=status}ExitStatus.prototype=new Error;ExitStatus.prototype.constructor=ExitStatus;dependenciesFulfilled=function runCaller(){if(!Module["calledRun"])run();if(!Module["calledRun"])dependenciesFulfilled=runCaller};function run(args){args=args||Module["arguments"];if(runDependencies>0){return}writeStackCookie();preRun();if(runDependencies>0)return;if(Module["calledRun"])return;function doRun(){if(Module["calledRun"])return;Module["calledRun"]=true;if(ABORT)return;ensureInitRuntime();preMain();if(Module["onRuntimeInitialized"])Module["onRuntimeInitialized"]();assert(!Module["_main"],'compiled without a main, but one is present. if you added it from JS, use Module["onRuntimeInitialized"]');postRun()}if(Module["setStatus"]){Module["setStatus"]("Running...");setTimeout((function(){setTimeout((function(){Module["setStatus"]("")}),1);doRun()}),1)}else{doRun()}checkStackCookie()}Module["run"]=run;var abortDecorators=[];function abort(what){if(Module["onAbort"]){Module["onAbort"](what)}if(what!==undefined){out(what);err(what);what=JSON.stringify(what)}else{what=""}ABORT=true;EXITSTATUS=1;var extra="";var output="abort("+what+") at "+stackTrace()+extra;if(abortDecorators){abortDecorators.forEach((function(decorator){output=decorator(output,what)}))}throw output}Module["abort"]=abort;if(Module["preInit"]){if(typeof Module["preInit"]=="function")Module["preInit"]=[Module["preInit"]];while(Module["preInit"].length>0){Module["preInit"].pop()()}}Module["noExitRuntime"]=true;run()





/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("stream");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __webpack_require__(7);
const path_1 = __webpack_require__(2);
const FakeFS_1 = __webpack_require__(8);
const NodeFS_1 = __webpack_require__(6);
const ZipFS_1 = __webpack_require__(12);
class ZipOpenFS extends FakeFS_1.FakeFS {
    constructor({ baseFs = new NodeFS_1.NodeFS(), filter = null, useCache = true } = {}) {
        super();
        this.isZip = new Set();
        this.notZip = new Set();
        this.baseFs = baseFs;
        this.zipInstances = useCache ? new Map() : null;
        this.filter = filter;
        this.isZip = new Set();
        this.notZip = new Set();
    }
    static open(fn) {
        const zipOpenFs = new ZipOpenFS();
        try {
            return fn(zipOpenFs);
        }
        finally {
            zipOpenFs.saveAndClose();
        }
    }
    static async openPromise(fn) {
        const zipOpenFs = new ZipOpenFS();
        try {
            return await fn(zipOpenFs);
        }
        finally {
            zipOpenFs.saveAndClose();
        }
    }
    getRealPath() {
        return this.baseFs.getRealPath();
    }
    saveAndClose() {
        if (this.zipInstances) {
            for (const [path, zipFs] of this.zipInstances.entries()) {
                zipFs.saveAndClose();
                this.zipInstances.delete(path);
            }
        }
    }
    discardAndClose() {
        if (this.zipInstances) {
            for (const [path, zipFs] of this.zipInstances.entries()) {
                zipFs.discardAndClose();
                this.zipInstances.delete(path);
            }
        }
    }
    async openPromise(p, flags, mode) {
        return await this.makeCallPromise(p, async () => {
            return await this.baseFs.openPromise(p, flags, mode);
        }, async (zipFs, { archivePath, subPath }) => {
            throw new Error(`Unsupported action (we wouldn't be able to disambiguate the close)`);
        });
    }
    openSync(p, flags, mode) {
        return this.makeCallSync(p, () => {
            return this.baseFs.openSync(p, flags, mode);
        }, (zipFs, { archivePath, subPath }) => {
            throw new Error(`Unsupported action (we wouldn't be able to disambiguate the close)`);
        });
    }
    async closePromise(fd) {
        return await this.baseFs.closePromise(fd);
    }
    closeSync(fd) {
        return this.baseFs.closeSync(fd);
    }
    createReadStream(p, opts) {
        return this.makeCallSync(p, () => {
            return this.baseFs.createReadStream(p, opts);
        }, (zipFs, { subPath }) => {
            return zipFs.createReadStream(subPath, opts);
        });
    }
    createWriteStream(p, opts) {
        return this.makeCallSync(p, () => {
            return this.baseFs.createWriteStream(p, opts);
        }, (zipFs, { subPath }) => {
            return zipFs.createWriteStream(subPath, opts);
        });
    }
    async realpathPromise(p) {
        return await this.makeCallPromise(p, async () => {
            return await this.baseFs.realpathPromise(p);
        }, async (zipFs, { archivePath, subPath }) => {
            return path_1.posix.resolve(archivePath, path_1.posix.relative(`/`, await zipFs.realpathPromise(subPath)));
        });
    }
    realpathSync(p) {
        return this.makeCallSync(p, () => {
            return this.baseFs.realpathSync(p);
        }, (zipFs, { archivePath, subPath }) => {
            return path_1.posix.resolve(archivePath, path_1.posix.relative(`/`, zipFs.realpathSync(subPath)));
        });
    }
    async existsPromise(p) {
        return await this.makeCallPromise(p, async () => {
            return await this.baseFs.existsPromise(p);
        }, async (zipFs, { archivePath, subPath }) => {
            return await zipFs.existsPromise(subPath);
        });
    }
    existsSync(p) {
        return this.makeCallSync(p, () => {
            return this.baseFs.existsSync(p);
        }, (zipFs, { subPath }) => {
            return zipFs.existsSync(subPath);
        });
    }
    async statPromise(p) {
        return await this.makeCallPromise(p, async () => {
            return await this.baseFs.statPromise(p);
        }, async (zipFs, { archivePath, subPath }) => {
            return await zipFs.statPromise(subPath);
        });
    }
    statSync(p) {
        return this.makeCallSync(p, () => {
            return this.baseFs.statSync(p);
        }, (zipFs, { subPath }) => {
            return zipFs.statSync(subPath);
        });
    }
    async lstatPromise(p) {
        return await this.makeCallPromise(p, async () => {
            return await this.baseFs.lstatPromise(p);
        }, async (zipFs, { archivePath, subPath }) => {
            return await zipFs.lstatPromise(subPath);
        });
    }
    lstatSync(p) {
        return this.makeCallSync(p, () => {
            return this.baseFs.lstatSync(p);
        }, (zipFs, { subPath }) => {
            return zipFs.lstatSync(subPath);
        });
    }
    async chmodPromise(p, mask) {
        return await this.makeCallPromise(p, async () => {
            return await this.baseFs.chmodPromise(p, mask);
        }, async (zipFs, { archivePath, subPath }) => {
            return await zipFs.chmodPromise(subPath, mask);
        });
    }
    chmodSync(p, mask) {
        return this.makeCallSync(p, () => {
            return this.baseFs.chmodSync(p, mask);
        }, (zipFs, { subPath }) => {
            return zipFs.chmodSync(subPath, mask);
        });
    }
    async renamePromise(oldP, newP) {
        return await this.makeCallPromise(oldP, async () => {
            return await this.makeCallPromise(newP, async () => {
                return await this.baseFs.renamePromise(oldP, newP);
            }, async () => {
                throw Object.assign(new Error(`EEXDEV: cross-device link not permitted`), { code: `EEXDEV` });
            });
        }, async (zipFsO, { archivePath: archivePathO, subPath: subPathO }) => {
            return await this.makeCallPromise(newP, async () => {
                throw Object.assign(new Error(`EEXDEV: cross-device link not permitted`), { code: `EEXDEV` });
            }, async (zipFsN, { archivePath: archivePathN, subPath: subPathN }) => {
                if (zipFsO !== zipFsN) {
                    throw Object.assign(new Error(`EEXDEV: cross-device link not permitted`), { code: `EEXDEV` });
                }
                else {
                    return await zipFsO.renamePromise(subPathO, subPathN);
                }
            });
        });
    }
    renameSync(oldP, newP) {
        return this.makeCallSync(oldP, () => {
            return this.makeCallSync(newP, () => {
                return this.baseFs.renameSync(oldP, newP);
            }, async () => {
                throw Object.assign(new Error(`EEXDEV: cross-device link not permitted`), { code: `EEXDEV` });
            });
        }, (zipFsO, { archivePath: archivePathO, subPath: subPathO }) => {
            return this.makeCallSync(newP, () => {
                throw Object.assign(new Error(`EEXDEV: cross-device link not permitted`), { code: `EEXDEV` });
            }, (zipFsN, { archivePath: archivePathN, subPath: subPathN }) => {
                if (zipFsO !== zipFsN) {
                    throw Object.assign(new Error(`EEXDEV: cross-device link not permitted`), { code: `EEXDEV` });
                }
                else {
                    return zipFsO.renameSync(subPathO, subPathN);
                }
            });
        });
    }
    async copyFilePromise(sourceP, destP, flags = 0) {
        const fallback = async (sourceFs, sourceP, destFs, destP) => {
            if ((flags & fs_1.constants.COPYFILE_FICLONE_FORCE) !== 0)
                throw Object.assign(new Error(`EXDEV: cross-device clone not permitted, copyfile '${sourceP}' -> ${destP}'`), { code: `EXDEV` });
            if ((flags & fs_1.constants.COPYFILE_EXCL) && await this.existsPromise(sourceP))
                throw Object.assign(new Error(`EEXIST: file already exists, copyfile '${sourceP}' -> '${destP}'`), { code: `EEXIST` });
            let content;
            try {
                content = await sourceFs.readFilePromise(sourceP);
            }
            catch (error) {
                throw Object.assign(new Error(`EINVAL: invalid argument, copyfile '${sourceP}' -> '${destP}'`), { code: `EINVAL` });
            }
            await destFs.writeFilePromise(destP, content);
        };
        return await this.makeCallPromise(sourceP, async () => {
            return await this.makeCallPromise(destP, async () => {
                return await this.baseFs.copyFilePromise(sourceP, destP, flags);
            }, async (zipFsD, { archivePath: archivePathD, subPath: subPathD }) => {
                return await fallback(this.baseFs, sourceP, zipFsD, subPathD);
            });
        }, async (zipFsS, { archivePath: archivePathS, subPath: subPathS }) => {
            return await this.makeCallPromise(destP, async () => {
                return await fallback(zipFsS, subPathS, this.baseFs, destP);
            }, async (zipFsD, { archivePath: archivePathD, subPath: subPathD }) => {
                if (zipFsS !== zipFsD) {
                    return await fallback(zipFsS, subPathS, zipFsD, subPathD);
                }
                else {
                    return await zipFsS.copyFilePromise(subPathS, subPathD, flags);
                }
            });
        });
    }
    copyFileSync(sourceP, destP, flags = 0) {
        const fallback = (sourceFs, sourceP, destFs, destP) => {
            if ((flags & fs_1.constants.COPYFILE_FICLONE_FORCE) !== 0)
                throw Object.assign(new Error(`EXDEV: cross-device clone not permitted, copyfile '${sourceP}' -> ${destP}'`), { code: `EXDEV` });
            if ((flags & fs_1.constants.COPYFILE_EXCL) && this.existsSync(sourceP))
                throw Object.assign(new Error(`EEXIST: file already exists, copyfile '${sourceP}' -> '${destP}'`), { code: `EEXIST` });
            let content;
            try {
                content = sourceFs.readFileSync(sourceP);
            }
            catch (error) {
                throw Object.assign(new Error(`EINVAL: invalid argument, copyfile '${sourceP}' -> '${destP}'`), { code: `EINVAL` });
            }
            destFs.writeFileSync(destP, content);
        };
        return this.makeCallSync(sourceP, () => {
            return this.makeCallSync(destP, () => {
                return this.baseFs.copyFileSync(sourceP, destP, flags);
            }, (zipFsD, { archivePath: archivePathD, subPath: subPathD }) => {
                return fallback(this.baseFs, sourceP, zipFsD, subPathD);
            });
        }, (zipFsS, { archivePath: archivePathS, subPath: subPathS }) => {
            return this.makeCallSync(destP, () => {
                return fallback(zipFsS, subPathS, this.baseFs, destP);
            }, (zipFsD, { archivePath: archivePathD, subPath: subPathD }) => {
                if (zipFsS !== zipFsD) {
                    return fallback(zipFsS, subPathS, zipFsD, subPathD);
                }
                else {
                    return zipFsS.copyFileSync(subPathS, subPathD, flags);
                }
            });
        });
    }
    async writeFilePromise(p, content, opts) {
        return await this.makeCallPromise(p, async () => {
            return await this.baseFs.writeFilePromise(p, content, opts);
        }, async (zipFs, { archivePath, subPath }) => {
            return await zipFs.writeFilePromise(subPath, content, opts);
        });
    }
    writeFileSync(p, content, opts) {
        return this.makeCallSync(p, () => {
            return this.baseFs.writeFileSync(p, content, opts);
        }, (zipFs, { subPath }) => {
            return zipFs.writeFileSync(subPath, content, opts);
        });
    }
    async unlinkPromise(p) {
        return await this.makeCallPromise(p, async () => {
            return await this.baseFs.unlinkPromise(p);
        }, async (zipFs, { archivePath, subPath }) => {
            return await zipFs.unlinkPromise(subPath);
        });
    }
    unlinkSync(p) {
        return this.makeCallSync(p, () => {
            return this.baseFs.unlinkSync(p);
        }, (zipFs, { subPath }) => {
            return zipFs.unlinkSync(subPath);
        });
    }
    async utimesPromise(p, atime, mtime) {
        return await this.makeCallPromise(p, async () => {
            return await this.baseFs.utimesPromise(p, atime, mtime);
        }, async (zipFs, { subPath }) => {
            return await zipFs.utimesPromise(subPath, atime, mtime);
        });
    }
    utimesSync(p, atime, mtime) {
        return this.makeCallSync(p, () => {
            return this.baseFs.utimesSync(p, atime, mtime);
        }, (zipFs, { subPath }) => {
            return zipFs.utimesSync(subPath, atime, mtime);
        });
    }
    async mkdirPromise(p) {
        return await this.makeCallPromise(p, async () => {
            return await this.baseFs.mkdirPromise(p);
        }, async (zipFs, { archivePath, subPath }) => {
            return await zipFs.mkdirPromise(subPath);
        });
    }
    mkdirSync(p) {
        return this.makeCallSync(p, () => {
            return this.baseFs.mkdirSync(p);
        }, (zipFs, { subPath }) => {
            return zipFs.mkdirSync(subPath);
        });
    }
    async rmdirPromise(p) {
        return await this.makeCallPromise(p, async () => {
            return await this.baseFs.rmdirPromise(p);
        }, async (zipFs, { archivePath, subPath }) => {
            return await zipFs.rmdirPromise(subPath);
        });
    }
    rmdirSync(p) {
        return this.makeCallSync(p, () => {
            return this.baseFs.rmdirSync(p);
        }, (zipFs, { subPath }) => {
            return zipFs.rmdirSync(subPath);
        });
    }
    async symlinkPromise(target, p) {
        return await this.makeCallPromise(p, async () => {
            return await this.baseFs.symlinkPromise(target, p);
        }, async (zipFs, { archivePath, subPath }) => {
            return await zipFs.symlinkPromise(target, subPath);
        });
    }
    symlinkSync(target, p) {
        return this.makeCallSync(p, () => {
            return this.baseFs.symlinkSync(target, p);
        }, (zipFs, { subPath }) => {
            return zipFs.symlinkSync(target, subPath);
        });
    }
    async readFilePromise(p, encoding) {
        return this.makeCallPromise(p, async () => {
            // This weird switch is required to tell TypeScript that the signatures are proper (otherwise it thinks that only the generic one is covered)
            switch (encoding) {
                case `utf8`:
                    return await this.baseFs.readFilePromise(p, encoding);
                default:
                    return await this.baseFs.readFilePromise(p, encoding);
            }
        }, async (zipFs, { subPath }) => {
            return await zipFs.readFilePromise(subPath, encoding);
        });
    }
    readFileSync(p, encoding) {
        return this.makeCallSync(p, () => {
            // This weird switch is required to tell TypeScript that the signatures are proper (otherwise it thinks that only the generic one is covered)
            switch (encoding) {
                case `utf8`:
                    return this.baseFs.readFileSync(p, encoding);
                default:
                    return this.baseFs.readFileSync(p, encoding);
            }
        }, (zipFs, { subPath }) => {
            return zipFs.readFileSync(subPath, encoding);
        });
    }
    async readdirPromise(p) {
        return await this.makeCallPromise(p, async () => {
            return await this.baseFs.readdirPromise(p);
        }, async (zipFs, { archivePath, subPath }) => {
            return await zipFs.readdirPromise(subPath);
        }, {
            requireSubpath: false,
        });
    }
    readdirSync(p) {
        return this.makeCallSync(p, () => {
            return this.baseFs.readdirSync(p);
        }, (zipFs, { subPath }) => {
            return zipFs.readdirSync(subPath);
        }, {
            requireSubpath: false,
        });
    }
    async readlinkPromise(p) {
        return await this.makeCallPromise(p, async () => {
            return await this.baseFs.readlinkPromise(p);
        }, async (zipFs, { archivePath, subPath }) => {
            return await zipFs.readlinkPromise(subPath);
        });
    }
    readlinkSync(p) {
        return this.makeCallSync(p, () => {
            return this.baseFs.readlinkSync(p);
        }, (zipFs, { subPath }) => {
            return zipFs.readlinkSync(subPath);
        });
    }
    async makeCallPromise(p, discard, accept, { requireSubpath = true } = {}) {
        p = path_1.posix.normalize(path_1.posix.resolve(`/`, p));
        const zipInfo = this.findZip(p);
        if (!zipInfo)
            return await discard();
        if (requireSubpath && zipInfo.subPath === `/`)
            return await discard();
        return await this.getZipPromise(zipInfo.archivePath, async (zipFs) => await accept(zipFs, zipInfo));
    }
    makeCallSync(p, discard, accept, { requireSubpath = true } = {}) {
        p = path_1.posix.normalize(path_1.posix.resolve(`/`, p));
        const zipInfo = this.findZip(p);
        if (!zipInfo)
            return discard();
        if (requireSubpath && zipInfo.subPath === `/`)
            return discard();
        return this.getZipSync(zipInfo.archivePath, zipFs => accept(zipFs, zipInfo));
    }
    findZip(p) {
        if (this.filter && !this.filter.test(p))
            return null;
        const parts = p.split(/\//g);
        for (let t = 2; t <= parts.length; ++t) {
            const archivePath = parts.slice(0, t).join(`/`);
            if (this.notZip.has(archivePath))
                continue;
            if (this.isZip.has(archivePath))
                return { archivePath, subPath: path_1.posix.resolve(`/`, parts.slice(t).join(`/`)) };
            let realArchivePath = archivePath;
            let stat;
            while (true) {
                try {
                    stat = this.baseFs.lstatSync(realArchivePath);
                }
                catch (error) {
                    return null;
                }
                if (stat.isSymbolicLink()) {
                    realArchivePath = path_1.posix.resolve(path_1.posix.dirname(realArchivePath), this.baseFs.readlinkSync(realArchivePath));
                }
                else {
                    break;
                }
            }
            const isZip = stat.isFile() && path_1.posix.extname(realArchivePath) === `.zip`;
            if (isZip) {
                this.isZip.add(archivePath);
                return { archivePath, subPath: path_1.posix.resolve(`/`, parts.slice(t).join(`/`)) };
            }
            else {
                this.notZip.add(archivePath);
                if (stat.isFile()) {
                    return null;
                }
            }
        }
        return null;
    }
    async getZipPromise(p, accept) {
        if (this.zipInstances) {
            let zipFs = this.zipInstances.get(p);
            if (!zipFs)
                this.zipInstances.set(p, zipFs = new ZipFS_1.ZipFS(p, { baseFs: this.baseFs, stats: await this.baseFs.statPromise(p) }));
            return await accept(zipFs);
        }
        else {
            const zipFs = new ZipFS_1.ZipFS(p, { baseFs: this.baseFs, stats: await this.baseFs.statPromise(p) });
            try {
                return await accept(zipFs);
            }
            finally {
                zipFs.saveAndClose();
            }
        }
    }
    getZipSync(p, accept) {
        if (this.zipInstances) {
            let zipFs = this.zipInstances.get(p);
            if (!zipFs)
                this.zipInstances.set(p, zipFs = new ZipFS_1.ZipFS(p, { baseFs: this.baseFs }));
            return accept(zipFs);
        }
        else {
            const zipFs = new ZipFS_1.ZipFS(p, { baseFs: this.baseFs });
            try {
                return accept(zipFs);
            }
            finally {
                zipFs.saveAndClose();
            }
        }
    }
}
exports.ZipOpenFS = ZipOpenFS;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Simple helper function that assign an error code to an error, so that it can more easily be caught and used
 * by third-parties.
 */
Object.defineProperty(exports, "__esModule", { value: true });
function makeError(code, message, data = {}) {
    const error = new Error(message);
    return Object.assign(error, { code, data });
}
exports.makeError = makeError;
/**
 * Returns the module that should be used to resolve require calls. It's usually the direct parent, except if we're
 * inside an eval expression.
 */
function getIssuerModule(parent) {
    let issuer = parent;
    while (issuer && (issuer.id === '[eval]' || issuer.id === '<repl>' || !issuer.filename)) {
        issuer = issuer.parent;
    }
    return issuer;
}
exports.getIssuerModule = getIssuerModule;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(__webpack_require__(2));
function hydrateRuntimeState(data, { basePath }) {
    const ignorePattern = data.ignorePatternData
        ? new RegExp(data.ignorePatternData)
        : null;
    const packageRegistry = new Map(data.packageRegistryData.map(([packageName, packageStoreData]) => {
        return [packageName, new Map(packageStoreData.map(([packageReference, packageInformationData]) => {
                return [packageReference, {
                        packageLocation: path_1.default.resolve(basePath, packageInformationData.packageLocation),
                        packageDependencies: new Map(packageInformationData.packageDependencies),
                    }];
            }))];
    }));
    const packageLocatorsByLocations = new Map(data.locationBlacklistData.map(location => {
        return [location, null];
    }));
    for (const [packageName, storeData] of data.packageRegistryData) {
        for (const [packageReference, packageInformationData] of storeData) {
            if ((packageName === null) !== (packageReference === null))
                throw new Error(`Assertion failed: The name and reference should be null, or neither should`);
            // @ts-ignore: TypeScript isn't smart enough to understand the type assertion
            const packageLocator = { name: packageName, reference: packageReference };
            packageLocatorsByLocations.set(packageInformationData.packageLocation, packageLocator);
        }
    }
    const packageLocationLengths = data.locationLengthData;
    return {
        basePath,
        ignorePattern,
        packageRegistry,
        packageLocatorsByLocations,
        packageLocationLengths,
    };
}
exports.hydrateRuntimeState = hydrateRuntimeState;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(__webpack_require__(7));
const module_1 = __importDefault(__webpack_require__(1));
const path_1 = __importDefault(__webpack_require__(2));
const internalTools_1 = __webpack_require__(19);
function makeApi(runtimeState, opts) {
    // @ts-ignore
    const builtinModules = new Set(module_1.default.builtinModules || Object.keys(process.binding('natives')));
    // Splits a require request into its components, or return null if the request is a file path
    const pathRegExp = /^(?![a-zA-Z]:[\\\/]|\\\\|\.{0,2}(?:\/|$))((?:@[^\/]+\/)?[^\/]+)\/?(.*|)$/;
    // Matches if the path starts with a valid path qualifier (./, ../, /)
    // eslint-disable-next-line no-unused-vars
    const isStrictRegExp = /^\.{0,2}\//;
    // Matches if the path must point to a directory (ie ends with /)
    const isDirRegExp = /\/$/;
    // Matches backslashes of Windows paths
    const backwardSlashRegExp = /\\/g;
    // We only instantiate one of those so that we can use strict-equal comparisons
    const topLevelLocator = { name: null, reference: null };
    // Used for compatibility purposes - cf setupCompatibilityLayer
    const fallbackLocators = [topLevelLocator];
    if (opts.compatibilityMode) {
        // ESLint currently doesn't have any portable way for shared configs to specify their own
        // plugins that should be used (https://github.com/eslint/eslint/issues/10125). This will
        // likely get fixed at some point, but it'll take time and in the meantime we'll just add
        // additional fallback entries for common shared configs.
        for (const name of [`gatsby`, `react-scripts`]) {
            const packageStore = runtimeState.packageRegistry.get(name);
            if (packageStore) {
                for (const reference of packageStore.keys()) {
                    if (reference === null) {
                        throw new Error(`Assertion failed: This reference shouldn't be null`);
                    }
                    else {
                        fallbackLocators.push({ name, reference });
                    }
                }
            }
        }
    }
    /**
     * The setup code will be injected here. The tables listed below are guaranteed to be filled after the call to
     * the $$DYNAMICALLY_GENERATED_CODE function.
     */
    const { ignorePattern, packageRegistry, packageLocatorsByLocations, packageLocationLengths, } = runtimeState;
    /**
     * Returns information about a package in a safe way (will throw if they cannot be retrieved)
     */
    function getPackageInformationSafe(packageLocator) {
        const packageInformation = getPackageInformation(packageLocator);
        if (!packageInformation) {
            throw internalTools_1.makeError(`INTERNAL`, `Couldn't find a matching entry in the dependency tree for the specified parent (this is probably an internal error)`);
        }
        return packageInformation;
    }
    /**
     * Implements the node resolution for folder access and extension selection
     */
    function applyNodeExtensionResolution(unqualifiedPath, candidates, { extensions }) {
        // We use this "infinite while" so that we can restart the process as long as we hit package folders
        while (true) {
            let stat;
            try {
                candidates.push(unqualifiedPath);
                stat = fs_1.default.statSync(unqualifiedPath);
            }
            catch (error) { }
            // If the file exists and is a file, we can stop right there
            if (stat && !stat.isDirectory()) {
                // If the very last component of the resolved path is a symlink to a file, we then resolve it to a file. We only
                // do this first the last component, and not the rest of the path! This allows us to support the case of bin
                // symlinks, where a symlink in "/xyz/pkg-name/.bin/bin-name" will point somewhere else (like "/xyz/pkg-name/index.js").
                // In such a case, we want relative requires to be resolved relative to "/xyz/pkg-name/" rather than "/xyz/pkg-name/.bin/".
                //
                // Also note that the reason we must use readlink on the last component (instead of realpath on the whole path)
                // is that we must preserve the other symlinks, in particular those used by pnp to deambiguate packages using
                // peer dependencies. For example, "/xyz/.pnp/local/pnp-01234569/.bin/bin-name" should see its relative requires
                // be resolved relative to "/xyz/.pnp/local/pnp-0123456789/" rather than "/xyz/pkg-with-peers/", because otherwise
                // we would lose the information that would tell us what are the dependencies of pkg-with-peers relative to its
                // ancestors.
                if (fs_1.default.lstatSync(unqualifiedPath).isSymbolicLink())
                    unqualifiedPath = path_1.default.normalize(path_1.default.resolve(path_1.default.dirname(unqualifiedPath), fs_1.default.readlinkSync(unqualifiedPath)));
                return unqualifiedPath;
            }
            // If the file is a directory, we must check if it contains a package.json with a "main" entry
            if (stat && stat.isDirectory()) {
                let pkgJson;
                try {
                    pkgJson = JSON.parse(fs_1.default.readFileSync(`${unqualifiedPath}/package.json`, 'utf-8'));
                }
                catch (error) { }
                let nextUnqualifiedPath;
                if (pkgJson && pkgJson.main)
                    nextUnqualifiedPath = path_1.default.resolve(unqualifiedPath, pkgJson.main);
                // If the "main" field changed the path, we start again from this new location
                if (nextUnqualifiedPath && nextUnqualifiedPath !== unqualifiedPath) {
                    const resolution = applyNodeExtensionResolution(nextUnqualifiedPath, candidates, { extensions });
                    if (resolution !== null) {
                        return resolution;
                    }
                }
            }
            // Otherwise we check if we find a file that match one of the supported extensions
            const qualifiedPath = extensions
                .map(extension => {
                return `${unqualifiedPath}${extension}`;
            })
                .find(candidateFile => {
                candidates.push(candidateFile);
                return fs_1.default.existsSync(candidateFile);
            });
            if (qualifiedPath)
                return qualifiedPath;
            // Otherwise, we check if the path is a folder - in such a case, we try to use its index
            if (stat && stat.isDirectory()) {
                const indexPath = extensions
                    .map(extension => {
                    return `${unqualifiedPath}/index${extension}`;
                })
                    .find(candidateFile => {
                    candidates.push(candidateFile);
                    return fs_1.default.existsSync(candidateFile);
                });
                if (indexPath) {
                    return indexPath;
                }
            }
            // Otherwise there's nothing else we can do :(
            return null;
        }
    }
    /**
     * This function creates fake modules that can be used with the _resolveFilename function.
     * Ideally it would be nice to be able to avoid this, since it causes useless allocations
     * and cannot be cached efficiently (we recompute the nodeModulePaths every time).
     *
     * Fortunately, this should only affect the fallback, and there hopefully shouldn't have a
     * lot of them.
     */
    function makeFakeModule(path) {
        // @ts-ignore
        const fakeModule = new module_1.default(path, null);
        fakeModule.filename = path;
        fakeModule.paths = module_1.default._nodeModulePaths(path);
        return fakeModule;
    }
    /**
     * Normalize path to posix format.
     */
    function normalizePath(p) {
        p = path_1.default.normalize(p);
        if (process.platform === 'win32')
            p = p.replace(backwardSlashRegExp, '/');
        return p;
    }
    /**
     * Forward the resolution to the next resolver (usually the native one)
     */
    function callNativeResolution(request, issuer) {
        if (issuer.endsWith('/'))
            issuer += 'internal.js';
        // Since we would need to create a fake module anyway (to call _resolveLookupPath that
        // would give us the paths to give to _resolveFilename), we can as well not use
        // the {paths} option at all, since it internally makes _resolveFilename create another
        // fake module anyway.
        return module_1.default._resolveFilename(request, makeFakeModule(issuer), false, { plugnplay: false });
    }
    /**
     * This key indicates which version of the standard is implemented by this resolver. The `std` key is the
     * Plug'n'Play standard, and any other key are third-party extensions. Third-party extensions are not allowed
     * to override the standard, and can only offer new methods.
     *
     * If an new version of the Plug'n'Play standard is released and some extensions conflict with newly added
     * functions, they'll just have to fix the conflicts and bump their own version number.
     */
    const VERSIONS = { std: 1 };
    /**
     * We export a special symbol for easy access to the top level locator.
     */
    const topLevel = topLevelLocator;
    /**
     * Gets the package information for a given locator. Returns null if they cannot be retrieved.
     */
    function getPackageInformation({ name, reference }) {
        const packageInformationStore = packageRegistry.get(name);
        if (!packageInformationStore)
            return null;
        const packageInformation = packageInformationStore.get(reference);
        if (!packageInformation)
            return null;
        return packageInformation;
    }
    ;
    /**
     * Finds the package locator that owns the specified path. If none is found, returns null instead.
     */
    function findPackageLocator(location) {
        let relativeLocation = normalizePath(path_1.default.relative(runtimeState.basePath, location));
        if (!relativeLocation.match(isStrictRegExp))
            relativeLocation = `./${relativeLocation}`;
        if (location.match(isDirRegExp) && !relativeLocation.endsWith(`/`))
            relativeLocation = `${relativeLocation}/`;
        let from = 0;
        // If someone wants to use a binary search to go from O(n) to O(log n), be my guest
        while (from < packageLocationLengths.length && packageLocationLengths[from] > relativeLocation.length)
            from += 1;
        for (let t = from; t < packageLocationLengths.length; ++t) {
            const locator = packageLocatorsByLocations.get(relativeLocation.substr(0, packageLocationLengths[t]));
            if (!locator)
                continue;
            // Ensures that the returned locator isn't a blacklisted one.
            //
            // Blacklisted packages are packages that cannot be used because their dependencies cannot be deduced. This only
            // happens with peer dependencies, which effectively have different sets of dependencies depending on their
            // parents.
            //
            // In order to deambiguate those different sets of dependencies, the Yarn implementation of PnP will generate a
            // symlink for each combination of <package name>/<package version>/<dependent package> it will find, and will
            // blacklist the target of those symlinks. By doing this, we ensure that files loaded through a specific path
            // will always have the same set of dependencies, provided the symlinks are correctly preserved.
            //
            // Unfortunately, some tools do not preserve them, and when it happens PnP isn't able anymore to deduce the set of
            // dependencies based on the path of the file that makes the require calls. But since we've blacklisted those
            // paths, we're able to print a more helpful error message that points out that a third-party package is doing
            // something incompatible!
            if (locator === null) {
                throw internalTools_1.makeError(`BLACKLISTED`, [
                    `A package has been resolved through a blacklisted path - this is usually caused by one of your tool`,
                    `calling "realpath" on the return value of "require.resolve". Since the returned values use symlinks to`,
                    `disambiguate peer dependencies, they must be passed untransformed to "require".`,
                ].join(` `));
            }
            return locator;
        }
        return null;
    }
    /**
     * Transforms a request (what's typically passed as argument to the require function) into an unqualified path.
     * This path is called "unqualified" because it only changes the package name to the package location on the disk,
     * which means that the end result still cannot be directly accessed (for example, it doesn't try to resolve the
     * file extension, or to resolve directories to their "index.js" content). Use the "resolveUnqualified" function
     * to convert them to fully-qualified paths, or just use "resolveRequest" that do both operations in one go.
     *
     * Note that it is extremely important that the `issuer` path ends with a forward slash if the issuer is to be
     * treated as a folder (ie. "/tmp/foo/" rather than "/tmp/foo" if "foo" is a directory). Otherwise relative
     * imports won't be computed correctly (they'll get resolved relative to "/tmp/" instead of "/tmp/foo/").
     */
    function resolveToUnqualified(request, issuer, { considerBuiltins = true } = {}) {
        // The 'pnpapi' request is reserved and will always return the path to the PnP file, from everywhere
        if (request === `pnpapi`)
            return opts.pnpapiResolution;
        // Bailout if the request is a native module
        if (considerBuiltins && builtinModules.has(request))
            return null;
        // We allow disabling the pnp resolution for some subpaths. This is because some projects, often legacy,
        // contain multiple levels of dependencies (ie. a yarn.lock inside a subfolder of a yarn.lock). This is
        // typically solved using workspaces, but not all of them have been converted already.
        if (ignorePattern && issuer && ignorePattern.test(normalizePath(issuer))) {
            const result = callNativeResolution(request, issuer);
            if (result === false) {
                throw internalTools_1.makeError(`BUILTIN_NODE_RESOLUTION_FAIL`, `The builtin node resolution algorithm was unable to resolve the requested module (it didn't go through the pnp resolver because the issuer was explicitely ignored by the regexp)\n\nRequire request: "${request}"\nRequired by: ${issuer}\n`, { request, issuer });
            }
            return result;
        }
        let unqualifiedPath;
        // If the request is a relative or absolute path, we just return it normalized
        const dependencyNameMatch = request.match(pathRegExp);
        if (!dependencyNameMatch) {
            if (path_1.default.isAbsolute(request)) {
                unqualifiedPath = path_1.default.normalize(request);
            }
            else {
                if (!issuer) {
                    throw internalTools_1.makeError(`API_ERROR`, `The resolveToUnqualified function must be called with a valid issuer when the path isn't a builtin nor absolute`, { request, issuer });
                }
                if (issuer.match(isDirRegExp)) {
                    unqualifiedPath = path_1.default.normalize(path_1.default.resolve(issuer, request));
                }
                else {
                    unqualifiedPath = path_1.default.normalize(path_1.default.resolve(path_1.default.dirname(issuer), request));
                }
            }
        }
        // Things are more hairy if it's a package require - we then need to figure out which package is needed, and in
        // particular the exact version for the given location on the dependency tree
        else {
            if (!issuer) {
                throw internalTools_1.makeError(`API_ERROR`, `The resolveToUnqualified function must be called with a valid issuer when the path isn't a builtin nor absolute`, { request, issuer });
            }
            const [, dependencyName, subPath] = dependencyNameMatch;
            const issuerLocator = findPackageLocator(issuer);
            // If the issuer file doesn't seem to be owned by a package managed through pnp, then we resort to using the next
            // resolution algorithm in the chain, usually the native Node resolution one
            if (!issuerLocator) {
                const result = callNativeResolution(request, issuer);
                if (result === false) {
                    throw internalTools_1.makeError(`BUILTIN_NODE_RESOLUTION_FAIL`, `The builtin node resolution algorithm was unable to resolve the requested module (it didn't go through the pnp resolver because the issuer doesn't seem to be part of the Yarn-managed dependency tree)\n\nRequire path: "${request}"\nRequired by: ${issuer}\n`, { request, issuer });
                }
                return result;
            }
            const issuerInformation = getPackageInformationSafe(issuerLocator);
            // We obtain the dependency reference in regard to the package that request it
            let dependencyReference = issuerInformation.packageDependencies.get(dependencyName);
            // If we can't find it, we check if we can potentially load it from the packages that have been defined as potential fallbacks.
            // It's a bit of a hack, but it improves compatibility with the existing Node ecosystem. Hopefully we should eventually be able
            // to kill this logic and become stricter once pnp gets enough traction and the affected packages fix themselves.
            if (issuerLocator.name !== null) {
                for (let t = 0, T = fallbackLocators.length; dependencyReference === undefined && t < T; ++t) {
                    const fallbackInformation = getPackageInformationSafe(fallbackLocators[t]);
                    dependencyReference = fallbackInformation.packageDependencies.get(dependencyName);
                }
            }
            // If we can't find the path, and if the package making the request is the top-level, we can offer nicer error messages
            if (!dependencyReference) {
                if (dependencyReference === null) {
                    if (issuerLocator.name === null) {
                        throw internalTools_1.makeError(`MISSING_PEER_DEPENDENCY`, `Something that got detected as your top-level application (because it doesn't seem to belong to any package) tried to access a peer dependency; this isn't allowed as the peer dependency cannot be provided by any parent package\n\nRequired package: ${dependencyName} (via "${request}")\nRequired by: ${issuer}\n`, { request, issuer, dependencyName });
                    }
                    else {
                        throw internalTools_1.makeError(`MISSING_PEER_DEPENDENCY`, `A package is trying to access a peer dependency that should be provided by its direct ancestor but isn't\n\nRequired package: ${dependencyName} (via "${request}")\nRequired by: ${issuerLocator.name}@${issuerLocator.reference} (via ${issuer})\n`, { request, issuer, issuerLocator: Object.assign({}, issuerLocator), dependencyName });
                    }
                }
                else {
                    if (issuerLocator.name === null) {
                        throw internalTools_1.makeError(`UNDECLARED_DEPENDENCY`, `Something that got detected as your top-level application (because it doesn't seem to belong to any package) tried to access a package that is not declared in your dependencies\n\nRequired package: ${dependencyName} (via "${request}")\nRequired by: ${issuer}\n`, { request, issuer, dependencyName });
                    }
                    else {
                        const candidates = Array.from(issuerInformation.packageDependencies.keys());
                        throw internalTools_1.makeError(`UNDECLARED_DEPENDENCY`, `A package is trying to access another package without the second one being listed as a dependency of the first one\n\nRequired package: ${dependencyName} (via "${request}")\nRequired by: ${issuerLocator.name}@${issuerLocator.reference} (via ${issuer})\n`, { request, issuer, issuerLocator: Object.assign({}, issuerLocator), dependencyName, candidates });
                    }
                }
            }
            // We need to check that the package exists on the filesystem, because it might not have been installed
            const dependencyLocator = { name: dependencyName, reference: dependencyReference };
            const dependencyInformation = getPackageInformationSafe(dependencyLocator);
            if (!dependencyInformation.packageLocation) {
                throw internalTools_1.makeError(`MISSING_DEPENDENCY`, `A dependency seems valid but didn't get installed for some reason. This might be caused by a partial install, such as dev vs prod.\n\nRequired package: ${dependencyLocator.name}@${dependencyLocator.reference} (via "${request}")\nRequired by: ${issuerLocator.name}@${issuerLocator.reference} (via ${issuer})\n`, { request, issuer, dependencyLocator: Object.assign({}, dependencyLocator) });
            }
            // Now that we know which package we should resolve to, we only have to find out the file location
            const dependencyLocation = path_1.default.resolve(runtimeState.basePath, dependencyInformation.packageLocation);
            if (subPath) {
                unqualifiedPath = path_1.default.resolve(dependencyLocation, subPath);
            }
            else {
                unqualifiedPath = dependencyLocation;
            }
        }
        return path_1.default.normalize(unqualifiedPath);
    }
    ;
    /**
     * Transforms an unqualified path into a qualified path by using the Node resolution algorithm (which automatically
     * appends ".js" / ".json", and transforms directory accesses into "index.js").
     */
    function resolveUnqualified(unqualifiedPath, { extensions = Object.keys(module_1.default._extensions) } = {}) {
        const candidates = [];
        const qualifiedPath = applyNodeExtensionResolution(unqualifiedPath, candidates, { extensions });
        if (qualifiedPath) {
            return path_1.default.normalize(qualifiedPath);
        }
        else {
            throw internalTools_1.makeError(`QUALIFIED_PATH_RESOLUTION_FAILED`, `Couldn't find a suitable Node resolution for the specified unqualified path\n\nSource path: ${unqualifiedPath}\n${candidates.map(candidate => `Rejected resolution: ${candidate}\n`).join(``)}`, { unqualifiedPath });
        }
    }
    ;
    /**
     * Transforms a request into a fully qualified path.
     *
     * Note that it is extremely important that the `issuer` path ends with a forward slash if the issuer is to be
     * treated as a folder (ie. "/tmp/foo/" rather than "/tmp/foo" if "foo" is a directory). Otherwise relative
     * imports won't be computed correctly (they'll get resolved relative to "/tmp/" instead of "/tmp/foo/").
     */
    function resolveRequest(request, issuer, { considerBuiltins, extensions } = {}) {
        let unqualifiedPath = resolveToUnqualified(request, issuer, { considerBuiltins });
        if (unqualifiedPath === null) {
            return null;
        }
        try {
            return resolveUnqualified(unqualifiedPath, { extensions });
        }
        catch (resolutionError) {
            if (resolutionError.code === 'QUALIFIED_PATH_RESOLUTION_FAILED') {
                Object.assign(resolutionError.data, { request, issuer });
            }
            throw resolutionError;
        }
    }
    ;
    return {
        VERSIONS,
        topLevel,
        getPackageInformation,
        findPackageLocator,
        resolveToUnqualified,
        resolveUnqualified,
        resolveRequest,
    };
}
exports.makeApi = makeApi;


/***/ })
/******/ ]);
