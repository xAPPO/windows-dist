"use strict";
// - Tools for CI(s) the "Configurable Information".
// - The CI presents the value wrapper for most of internal types and has
//   various reference and platform implementations like iOS native.
// - The UI packages xide,xblox,xideve and xfile and all their dialogs are generated by this type.
// - The widget class is mapped in CI['type'] which points to xide/types/ECIType, an
//   int enumeration from -1 = Unknown to at least 32 more values, after xide.types.ECIType.END begins
//   the user land
Object.defineProperty(exports, "__esModule", { value: true });
// - Urgent: the reason for value[0] in the code below is back-compate to pre Dojo - 2.0 stores. To be removed soon.
const _ = require("lodash");
const primitives_1 = require("../std/primitives");
function toOptions(cis) {
    cis = flattenCIS(cis);
    let result = [];
    for (let i = 0; i < cis.length; i++) {
        let ci = cis[i];
        result.push({
            name: toString(ci['name']),
            value: getCIValue(ci),
            type: toInt(ci['type']),
            enumType: toString(ci['enumType']),
            visible: toBoolean(ci['visible']),
            active: toBoolean(ci['active']),
            changed: toBoolean(ci['changed']),
            group: toString(ci['group']),
            user: toObject(ci['user']),
            dst: toString(ci['dst']),
            params: toString(ci['params'])
        });
    }
    return result;
}
exports.toOptions = toOptions;
;
function toObject(data) {
    if (data != null) {
        return data[0] ? data[0] : data;
    }
    return null;
}
exports.toObject = toObject;
;
function flattenCIS(cis) {
    return [];
}
exports.flattenCIS = flattenCIS;
;
function toInt(data) {
    if (_.isNumber(data)) {
        return data;
    }
    let resInt = -1;
    if (data != null) {
        let _dataStr = data.length > 1 ? data : data[0] ? data[0] : data;
        if (_dataStr != null) {
            resInt = parseInt(_dataStr, 10);
        }
    }
    return resInt;
}
exports.toInt = toInt;
function arrayContains(array, element) {
    for (let i = 0; i < array.length; i++) {
        let _e = array[i];
        if (_e === element) {
            return true;
        }
    }
    return false;
}
exports.arrayContains = arrayContains;
function setStoreCIValueByField(data, field, value) {
    if (data[field] == null) {
        data[field] = [];
    }
    data[field][0] = getStringValue(value);
    return data;
}
exports.setStoreCIValueByField = setStoreCIValueByField;
function createOption(label, value, extra) {
    return _.mixin({
        label: label,
        value: value != null ? value : label
    }, extra);
}
exports.createOption = createOption;
function hasValue(data) {
    return data.value && data.value[0] != null && data.value[0].length > 0 && data.value[0] !== '0' && data.value[0] !== "undefined" && data.value[0] !== 'Unset';
}
exports.hasValue = hasValue;
function getInputCIByName(data, name) {
    if (!data || !name) {
        return null;
    }
    let chain = 0;
    let dstChain = chain === 0 ? data.inputs : chain === 1 ? data.outputs : null;
    if (!dstChain) {
        dstChain = data;
    }
    if (dstChain != null) {
        for (let i = 0; i < dstChain.length; i++) {
            let ci = dstChain[i];
            let _n = getStringValue(ci.name);
            if (_n != null && _n.toLowerCase() === name.toLowerCase()) {
                return ci;
            }
        }
    }
    return null;
}
exports.getInputCIByName = getInputCIByName;
function getInputCIById(data, name) {
    if (!data) {
        return null;
    }
    let chain = 0;
    let dstChain = chain === 0 ? data.inputs : chain === 1 ? data.outputs : null;
    // has no chains, be nice
    !dstChain && (dstChain = data);
    if (dstChain != null) {
        for (let i = 0; i < dstChain.length; i++) {
            let ci = dstChain[i];
            let _n = getStringValue(ci.id);
            if (_n != null && _n.toLowerCase() === name.toLowerCase()) {
                return ci;
            }
        }
    }
    return null;
}
exports.getInputCIById = getInputCIById;
function getCIByChainAndName(data, chain, name) {
    if (!data) {
        return null;
    }
    let dstChain = chain === 0 ? data.inputs : chain === 1 ? data.outputs : null;
    if (!dstChain) {
        // has no chains
        dstChain = data;
    }
    if (dstChain != null) {
        for (let i = 0; i < dstChain.length; i++) {
            let ci = dstChain[i];
            let _n = getStringValue(ci.name);
            if (_n != null && _n.toLowerCase() === name.toLowerCase()) {
                return ci;
            }
        }
    }
    return null;
}
exports.getCIByChainAndName = getCIByChainAndName;
function getCIById(data, chain, id) {
    let dstChain = chain === 0 ? data.inputs : chain === 1 ? data.outputs : null;
    if (dstChain != null) {
        for (let i = 0; i < dstChain.length; i++) {
            let ci = dstChain[i];
            if (ci.id[0] === id[0]) {
                return ci;
            }
        }
    }
    return null;
}
exports.getCIById = getCIById;
function getCIInputValueByName(data, name) {
    let ci = getCIByChainAndName(data, 0, name);
    if (ci) {
        return ci.value;
    }
    return null;
}
exports.getCIInputValueByName = getCIInputValueByName;
function getCIValue(data) {
    return getCIValueByField(data, 'value');
}
exports.getCIValue = getCIValue;
function getStringValue(d) {
    return toString(d);
}
exports.getStringValue = getStringValue;
function toString(d) {
    if (d != null) {
        if (!primitives_1.isArray(d)) {
            return '' + d;
        }
        if (d && d.length === 1 && d[0] == null) {
            return null;
        }
        return '' + (d[0] != null ? d[0] : d);
    }
    return null;
}
exports.toString = toString;
function setIntegerValue(data, value) {
    if (data != null) {
        if (primitives_1.isArray(data)) {
            data[0] = value;
        }
        else {
            data = value;
        }
    }
}
exports.setIntegerValue = setIntegerValue;
function getCIValueByField(data, field) {
    if (data[field] != null) {
        if (primitives_1.isArray(data[field])) {
            return data[field][0] ? data[field][0] : data[field];
        }
        else {
            return data[field];
        }
    }
    return null;
}
exports.getCIValueByField = getCIValueByField;
function setCIValueByField(data, field, value) {
    if (!data) {
        return data;
    }
    if (data[field] == null) {
        data[field] = [];
    }
    data[field] = value;
    return data;
}
exports.setCIValueByField = setCIValueByField;
function setCIValue(data, field, value) {
    let ci = getInputCIByName(data, field);
    if (ci) {
        setCIValueByField(ci, 'value', value);
    }
    return ci;
}
exports.setCIValue = setCIValue;
function getCIInputValueByNameAndField(data, name, field) {
    let ci = getCIByChainAndName(data, 0, name);
    if (ci) {
        return ci[field];
    }
    return null;
}
exports.getCIInputValueByNameAndField = getCIInputValueByNameAndField;
function getCIInputValueByNameAndFieldStr(data, name, field) {
    const rawValue = getCIInputValueByNameAndField(data, name, field);
    if (rawValue) {
        return getStringValue(rawValue);
    }
    return null;
}
exports.getCIInputValueByNameAndFieldStr = getCIInputValueByNameAndFieldStr;
function toString2(val) {
    if (val != null) {
        if (!primitives_1.isArray(val)) {
            return '' + val;
        }
        if (val && val.length === 1 && val[0] == null) {
            return null;
        }
        return '' + (val[0] != null ? val[0] : val);
    }
    return null;
}
exports.toString2 = toString2;
function toBoolean(data) {
    let result = false;
    if (data != null) {
        let _dataStr = data[0] ? data[0] : data;
        if (_dataStr != null) {
            result = !!((_dataStr === true || _dataStr === 'true' || _dataStr === '1'));
        }
    }
    return result;
}
exports.toBoolean = toBoolean;
function getCIInputValueByNameAndFieldBool(data, name, field) {
    let rawValue = getCIInputValueByNameAndField(data, name, field);
    if (rawValue) {
        return toBoolean(rawValue);
    }
    return null;
}
exports.getCIInputValueByNameAndFieldBool = getCIInputValueByNameAndFieldBool;
//# sourceMappingURL=CIUtils.js.map