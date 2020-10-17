import { IndentedStringWriter } from "../utils/indented_string_writer";
import * as ArrayUtils from "../utils/array_utils";

import * as Keywords from "../tokens/keywords";
import * as Delimiters from "../tokens/delimiters";
import * as NamespaceTokens from "../tokens/namespace_tokens";
import * as CurlyBraces from "../tokens/curly_braces";
import * as NamespaceImportEmitter from "./namespace_import_emitter";
import * as TypeEmitter from "./type_emitter";


export function emitMany(writer: IndentedStringWriter, namespaces: Hexarc.CSharpDom.Namespace[] | undefined) {
  if (ArrayUtils.isFalsy(namespaces)) return;
  namespaces.forEach(ns => emitOne(writer, ns));
}

export function emitOne(writer: IndentedStringWriter, namespace: Hexarc.CSharpDom.Namespace) {
  const { path, imports, types } = namespace;
  emitDefinition(writer, path);
  NamespaceImportEmitter.emitMany(writer, imports);
  TypeEmitter.emitMany(writer, types);
  emitEnd(writer);
}

function emitDefinition( writer: IndentedStringWriter, path: string | string[]) {
  writer
    .writeLine(Keywords.namespace, Delimiters.space, ...NamespaceTokens.emit(path))
    .writeLine(CurlyBraces.open)
    .indent();
}

function emitEnd(writer: IndentedStringWriter) {
  writer
    .unindent()
    .writeLine(CurlyBraces.close)
    .writeLine();
}