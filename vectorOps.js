const arrayTypes = [Int8Array, Uint8Array, Uint8ClampedArray, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array, Array]

const assignVecOps = type => Object.assign (type.prototype, {
	add (...others) {
		return others.reduce (
			(prev, cur) => prev.map ((val, idx) => val + cur[idx]),
			type.from (this)
		)
	},
	eq (other) {
		if (this.length != other.length) return false
		return this.every ((val, idx) => 
			(typeof val == 'object' && 'eq' in val) ?
				val.eq (other [idx]) :
				val === other [idx]
		)

	},

	sclMul (scalar) {
		return this.map (x => x * scalar)
	}
})

arrayTypes.forEach (assignVecOps)