import { IndentedStringWriter } from "../utils/indented_string_writer";

import * as Signs from "../tokens/signs";
import * as Delimiters from "../tokens/delimiters";
import * as ScopeTokens from "../tokens/scope_tokens";
import * as PropertyTokens from "../tokens/property_tokens";
import * as TypeReferenceTokens from "../tokens/type_reference_tokens";

import * as AttributeEmitter from "./attribute_emitter";


export function emit(writer: IndentedStringWriter, property: Hexarc.CSharpDom.PropertyMember) {
  const { access, type, name, value } = property;
  const accessTokens = access ? [access, Delimiters.space] : [];
  const resultTokens = TypeReferenceTokens.emit(type);
  const bodyTokens = emitBody();
  const valueTokens = value != null ? [Delimiters.space, Signs.equal, Delimiters.space, value, Delimiters.semicolon] : [];
  emitAttributes(writer, property);
  writer
    .outputTabs()
      .write(...accessTokens)
      .write(...resultTokens)
      .write(Delimiters.space)
      .write(name)
      .write(Delimiters.space)
      .write(...bodyTokens)
      .write(...valueTokens)
    .writeLineNoTabs();
}

function emitAttributes(writer: IndentedStringWriter, property: Hexarc.CSharpDom.PropertyMember) {
  const { attributes } = property;
  AttributeEmitter.emitMany(writer, attributes);
}

function emitBody() {
  return [
    ScopeTokens.open, Delimiters.space, 
    ...emitGetter(), Delimiters.space,
    ...emitterSetter(), Delimiters.space,
    ScopeTokens.close
  ];
}

function emitGetter() {
  return [PropertyTokens.get, Delimiters.semicolon];
}

function emitterSetter() {
  return [PropertyTokens.set, Delimiters.semicolon];
}