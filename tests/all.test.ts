import * as fs from "fs";
import * as path from "path";
import * as CSharpDom from "../lib";


const codeUnit: Hexarc.CSharpDom.CodeUnit = {
  name: "all.cs",
  namespaces: [{
    path: ["Hexarc", "Api"],
    types: [{
      kind: "class",
      modifier: "sealed",
      access: "public",
      name: "Matrix2x2",
      members: [{
        kind: "field",
        access: ["protected", "internal"],
        type: {
          namespace: "System",
          name: "Single"
        },
        name: "x"
      }, {
        kind: "field",
        access: "public",
        type: {
          namespace: "System",
          name: "Single"
        },
        name: "y"
      }]
    }, {
      kind: "class",
      attributes: [{
        type: {
          namespace: ["Microsoft", "AspNetCore", "Mvc"],
          name: "ApiController"
        }
      }, {
          type: {
          namespace: ["Microsoft", "AspNetCore", "Mvc"],
          name: "RequireHttps"
        }
      }],
      access: "public",
      isPartial: true,
      modifier: "sealed",
      name: "Point",
      baseType: {
        namespace: "System",
        name: "Object"
      },
      members: [{
        kind: "method",
        access: "public",
        name: "Sum",
        result: { namespace: "System", name: "Int32" },
        parameters: [{
          type: { namespace: "System", name: "Int32" },
          name: "x"
        }, {
          type: { namespace: "System", name: "Int32" },
          name: "y"
        }],
        body: {
          statements: [
            "return x + y;"
          ]
        }
      }, {
        kind: "method",
        access: "public",
        name: "Print",
        result: "void",
        parameters: [{
          type: { namespace: "System", name: "Int32" },
          name: "x"
        }],
        body: {
          statements: [
            "System.Console.WriteLine(x);"
          ]
        }
      }, {
        kind: "property",
        attributes: [{
          type: {
            namespace: ["System"],
            name: "Obsolete",
          },
          arguments: ["\"Use something else\""]
        }, {
          type: {
            namespace: ["Newtonsoft", "Json"],
            name: "JsonProperty"
          },
          arguments: ["\"x\""]
        }],
        access: "public",
        type: { namespace: "System", name: "Int32" },
        name: "X"
      }, {
        kind: "property",
        access: "public",
        type: { namespace: "System", name: "Int32" },
        name: "Y"
      }]
    }, {
      kind: "class",
      access: "public",
      modifier: "static",
      name: "PointFactory"
    }, {
      kind: "class",
      access: "internal",
      modifier: "abstract",
      name: "PrinterBase",
      generics: [{
        kind: "parameter",
        name: "T",
        modifier: "in"
      }],
      members: [{
        kind: "method",
        access: "public",
        name: "Print",
        result: {
          namespace: ["System", "Collections", "Generic"],
          name: "HashSet",
          generics: [{ kind: "parameter", name: "T" }]
        },
        body: {
          statements: [
            "throw new System.NotImplementedException();"
          ]
        }
      }, {
        kind: "method",
        access: "public",
        name: "Any",
        result: {
          namespace: ["System", "Collections", "Generic"],
          name: "HashSet",
          generics: [{ kind: "parameter", name: "V" }]
        },
        generics: [{
          kind: "parameter",
          name: "V"
        }],
        body: {
          statements: [
            "throw new System.NotImplementedException();"
          ]
        }
      }]
    }, {
      kind: "class",
      access: "public",
      modifier: "abstract",
      name: "KeyValue",
      generics: [{
        kind: "parameter",
        name: "TKey"
      }, {
        kind: "parameter",
        name: "TValue"
      }],
      baseType: {
        namespace: ["System", "Collections", "Generic"],
        name: "Dictionary",
        generics: [{
          kind: "parameter",
          name: "TKey"
        }, {
          kind: "parameter",
          name: "TValue"
        }]
      }
    }]
  }]
};

fs.writeFileSync(path.join("tests", codeUnit.name), CSharpDom.emit(codeUnit));