// Welcome to the FourSlash syntax guide!
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//---------------------------------------------
// Return code used by getEmitOutput function to indicate status of the function
// It is a duplicate of the one in types.ts to expose it to testcases in fourslash
var EmitReturnStatus;
(function (EmitReturnStatus) {
    EmitReturnStatus[EmitReturnStatus["Succeeded"] = 0] = "Succeeded";
    EmitReturnStatus[EmitReturnStatus["AllOutputGenerationSkipped"] = 1] = "AllOutputGenerationSkipped";
    EmitReturnStatus[EmitReturnStatus["JSGeneratedWithSemanticErrors"] = 2] = "JSGeneratedWithSemanticErrors";
    EmitReturnStatus[EmitReturnStatus["DeclarationGenerationSkipped"] = 3] = "DeclarationGenerationSkipped";
    EmitReturnStatus[EmitReturnStatus["EmitErrorsEncountered"] = 4] = "EmitErrorsEncountered"; // Emitter errors occurred during emitting process
})(EmitReturnStatus || (EmitReturnStatus = {}));
var FourSlashInterface;
(function (FourSlashInterface) {
    var test_ = (function () {
        function test_() {
        }
        test_.prototype.markers = function () {
            return FourSlash.currentTestState.getMarkers();
        };
        test_.prototype.marker = function (name) {
            return FourSlash.currentTestState.getMarkerByName(name);
        };
        test_.prototype.ranges = function () {
            return FourSlash.currentTestState.getRanges();
        };
        test_.prototype.markerByName = function (s) {
            return FourSlash.currentTestState.getMarkerByName(s);
        };
        return test_;
    })();
    FourSlashInterface.test_ = test_;
    var goTo = (function () {
        function goTo() {
        }
        // Moves the caret to the specified marker,
        // or the anonymous marker ('/**/') if no name
        // is given
        goTo.prototype.marker = function (name) {
            FourSlash.currentTestState.goToMarker(name);
        };
        goTo.prototype.bof = function () {
            FourSlash.currentTestState.goToBOF();
        };
        goTo.prototype.eof = function () {
            FourSlash.currentTestState.goToEOF();
        };
        goTo.prototype.definition = function (definitionIndex) {
            if (definitionIndex === void 0) { definitionIndex = 0; }
            FourSlash.currentTestState.goToDefinition(definitionIndex);
        };
        goTo.prototype.type = function (definitionIndex) {
            if (definitionIndex === void 0) { definitionIndex = 0; }
            FourSlash.currentTestState.goToTypeDefinition(definitionIndex);
        };
        goTo.prototype.position = function (position, fileNameOrIndex) {
            if (fileNameOrIndex !== undefined) {
                this.file(fileNameOrIndex);
            }
            FourSlash.currentTestState.goToPosition(position);
        };
        goTo.prototype.file = function (indexOrName) {
            FourSlash.currentTestState.openFile(indexOrName);
        };
        return goTo;
    })();
    FourSlashInterface.goTo = goTo;
    var verifyNegatable = (function () {
        function verifyNegatable(negative) {
            if (negative === void 0) { negative = false; }
            this.negative = negative;
            if (!negative) {
                this.not = new verifyNegatable(true);
            }
        }
        // Verifies the member list contains the specified symbol. The
        // member list is brought up if necessary
        verifyNegatable.prototype.memberListContains = function (symbol, text, documenation, kind) {
            if (this.negative) {
                FourSlash.currentTestState.verifyMemberListDoesNotContain(symbol);
            }
            else {
                FourSlash.currentTestState.verifyMemberListContains(symbol, text, documenation, kind);
            }
        };
        verifyNegatable.prototype.memberListCount = function (expectedCount) {
            FourSlash.currentTestState.verifyMemberListCount(expectedCount, this.negative);
        };
        // Verifies the completion list contains the specified symbol. The
        // completion list is brought up if necessary
        verifyNegatable.prototype.completionListContains = function (symbol, text, documentation, kind) {
            if (this.negative) {
                FourSlash.currentTestState.verifyCompletionListDoesNotContain(symbol, text, documentation, kind);
            }
            else {
                FourSlash.currentTestState.verifyCompletionListContains(symbol, text, documentation, kind);
            }
        };
        // Verifies the completion list items count to be greater than the specified amount. The
        // completion list is brought up if necessary
        verifyNegatable.prototype.completionListItemsCountIsGreaterThan = function (count) {
            FourSlash.currentTestState.verifyCompletionListItemsCountIsGreaterThan(count);
        };
        verifyNegatable.prototype.completionListIsEmpty = function () {
            FourSlash.currentTestState.verifyCompletionListIsEmpty(this.negative);
        };
        verifyNegatable.prototype.completionListAllowsNewIdentifier = function () {
            FourSlash.currentTestState.verifyCompletionListAllowsNewIdentifier(this.negative);
        };
        verifyNegatable.prototype.memberListIsEmpty = function () {
            FourSlash.currentTestState.verifyMemberListIsEmpty(this.negative);
        };
        verifyNegatable.prototype.referencesCountIs = function (count) {
            FourSlash.currentTestState.verifyReferencesCountIs(count, /*localFilesOnly*/ false);
        };
        verifyNegatable.prototype.referencesAtPositionContains = function (range, isWriteAccess) {
            FourSlash.currentTestState.verifyReferencesAtPositionListContains(range.fileName, range.start, range.end, isWriteAccess);
        };
        verifyNegatable.prototype.signatureHelpPresent = function () {
            FourSlash.currentTestState.verifySignatureHelpPresent(!this.negative);
        };
        verifyNegatable.prototype.errorExistsBetweenMarkers = function (startMarker, endMarker) {
            FourSlash.currentTestState.verifyErrorExistsBetweenMarkers(startMarker, endMarker, !this.negative);
        };
        verifyNegatable.prototype.errorExistsAfterMarker = function (markerName) {
            if (markerName === void 0) { markerName = ""; }
            FourSlash.currentTestState.verifyErrorExistsAfterMarker(markerName, !this.negative, true);
        };
        verifyNegatable.prototype.errorExistsBeforeMarker = function (markerName) {
            if (markerName === void 0) { markerName = ""; }
            FourSlash.currentTestState.verifyErrorExistsAfterMarker(markerName, !this.negative, false);
        };
        verifyNegatable.prototype.quickInfoIs = function (expectedText, expectedDocumentation) {
            FourSlash.currentTestState.verifyQuickInfoString(this.negative, expectedText, expectedDocumentation);
        };
        verifyNegatable.prototype.quickInfoExists = function () {
            FourSlash.currentTestState.verifyQuickInfoExists(this.negative);
        };
        verifyNegatable.prototype.definitionCountIs = function (expectedCount) {
            FourSlash.currentTestState.verifyDefinitionsCount(this.negative, expectedCount);
        };
        verifyNegatable.prototype.typeDefinitionCountIs = function (expectedCount) {
            FourSlash.currentTestState.verifyTypeDefinitionsCount(this.negative, expectedCount);
        };
        verifyNegatable.prototype.definitionLocationExists = function () {
            FourSlash.currentTestState.verifyDefinitionLocationExists(this.negative);
        };
        verifyNegatable.prototype.verifyDefinitionsName = function (name, containerName) {
            FourSlash.currentTestState.verifyDefinitionsName(this.negative, name, containerName);
        };
        return verifyNegatable;
    })();
    FourSlashInterface.verifyNegatable = verifyNegatable;
    var verify = (function (_super) {
        __extends(verify, _super);
        function verify() {
            _super.apply(this, arguments);
        }
        verify.prototype.caretAtMarker = function (markerName) {
            FourSlash.currentTestState.verifyCaretAtMarker(markerName);
        };
        verify.prototype.indentationIs = function (numberOfSpaces) {
            FourSlash.currentTestState.verifyIndentationAtCurrentPosition(numberOfSpaces);
        };
        verify.prototype.indentationAtPositionIs = function (fileName, position, numberOfSpaces) {
            FourSlash.currentTestState.verifyIndentationAtPosition(fileName, position, numberOfSpaces);
        };
        verify.prototype.textAtCaretIs = function (text) {
            FourSlash.currentTestState.verifyTextAtCaretIs(text);
        };
        /**
         * Compiles the current file and evaluates 'expr' in a context containing
         * the emitted output, then compares (using ===) the result of that expression
         * to 'value'. Do not use this function with external modules as it is not supported.
         */
        verify.prototype.eval = function (expr, value) {
            FourSlash.currentTestState.verifyEval(expr, value);
        };
        verify.prototype.currentLineContentIs = function (text) {
            FourSlash.currentTestState.verifyCurrentLineContent(text);
        };
        verify.prototype.currentFileContentIs = function (text) {
            FourSlash.currentTestState.verifyCurrentFileContent(text);
        };
        verify.prototype.verifyGetEmitOutputForCurrentFile = function (expected) {
            FourSlash.currentTestState.verifyGetEmitOutputForCurrentFile(expected);
        };
        verify.prototype.currentParameterHelpArgumentNameIs = function (name) {
            FourSlash.currentTestState.verifyCurrentParameterHelpName(name);
        };
        verify.prototype.currentParameterSpanIs = function (parameter) {
            FourSlash.currentTestState.verifyCurrentParameterSpanIs(parameter);
        };
        verify.prototype.currentParameterHelpArgumentDocCommentIs = function (docComment) {
            FourSlash.currentTestState.verifyCurrentParameterHelpDocComment(docComment);
        };
        verify.prototype.currentSignatureHelpDocCommentIs = function (docComment) {
            FourSlash.currentTestState.verifyCurrentSignatureHelpDocComment(docComment);
        };
        verify.prototype.signatureHelpCountIs = function (expected) {
            FourSlash.currentTestState.verifySignatureHelpCount(expected);
        };
        verify.prototype.signatureHelpArgumentCountIs = function (expected) {
            FourSlash.currentTestState.verifySignatureHelpArgumentCount(expected);
        };
        verify.prototype.currentSignatureParameterCountIs = function (expected) {
            FourSlash.currentTestState.verifyCurrentSignatureHelpParameterCount(expected);
        };
        verify.prototype.currentSignatureTypeParameterCountIs = function (expected) {
            FourSlash.currentTestState.verifyCurrentSignatureHelpTypeParameterCount(expected);
        };
        verify.prototype.currentSignatureHelpIs = function (expected) {
            FourSlash.currentTestState.verifyCurrentSignatureHelpIs(expected);
        };
        verify.prototype.numberOfErrorsInCurrentFile = function (expected) {
            FourSlash.currentTestState.verifyNumberOfErrorsInCurrentFile(expected);
        };
        verify.prototype.baselineCurrentFileBreakpointLocations = function () {
            FourSlash.currentTestState.baselineCurrentFileBreakpointLocations();
        };
        verify.prototype.baselineCurrentFileNameOrDottedNameSpans = function () {
            FourSlash.currentTestState.baselineCurrentFileNameOrDottedNameSpans();
        };
        verify.prototype.baselineGetEmitOutput = function () {
            FourSlash.currentTestState.baselineGetEmitOutput();
        };
        verify.prototype.nameOrDottedNameSpanTextIs = function (text) {
            FourSlash.currentTestState.verifyCurrentNameOrDottedNameSpanText(text);
        };
        verify.prototype.outliningSpansInCurrentFile = function (spans) {
            FourSlash.currentTestState.verifyOutliningSpans(spans);
        };
        verify.prototype.todoCommentsInCurrentFile = function (descriptors) {
            FourSlash.currentTestState.verifyTodoComments(descriptors, test.ranges());
        };
        verify.prototype.matchingBracePositionInCurrentFile = function (bracePosition, expectedMatchPosition) {
            FourSlash.currentTestState.verifyMatchingBracePosition(bracePosition, expectedMatchPosition);
        };
        verify.prototype.noMatchingBracePositionInCurrentFile = function (bracePosition) {
            FourSlash.currentTestState.verifyNoMatchingBracePosition(bracePosition);
        };
        verify.prototype.DocCommentTemplate = function (expectedText, expectedOffset, empty) {
            FourSlash.currentTestState.verifyDocCommentTemplate(empty ? undefined : { newText: expectedText, caretOffset: expectedOffset });
        };
        verify.prototype.noDocCommentTemplate = function () {
            this.DocCommentTemplate(/*expectedText*/ undefined, /*expectedOffset*/ undefined, true);
        };
        verify.prototype.getScriptLexicalStructureListCount = function (count) {
            FourSlash.currentTestState.verifyGetScriptLexicalStructureListCount(count);
        };
        // TODO: figure out what to do with the unused arguments.
        verify.prototype.getScriptLexicalStructureListContains = function (name, kind, fileName, parentName, isAdditionalSpan, markerPosition) {
            FourSlash.currentTestState.verifyGetScriptLexicalStructureListContains(name, kind);
        };
        verify.prototype.navigationItemsListCount = function (count, searchValue, matchKind) {
            FourSlash.currentTestState.verifyNavigationItemsCount(count, searchValue, matchKind);
        };
        verify.prototype.navigationItemsListContains = function (name, kind, searchValue, matchKind, fileName, parentName) {
            FourSlash.currentTestState.verifyNavigationItemsListContains(name, kind, searchValue, matchKind, fileName, parentName);
        };
        verify.prototype.occurrencesAtPositionContains = function (range, isWriteAccess) {
            FourSlash.currentTestState.verifyOccurrencesAtPositionListContains(range.fileName, range.start, range.end, isWriteAccess);
        };
        verify.prototype.occurrencesAtPositionCount = function (expectedCount) {
            FourSlash.currentTestState.verifyOccurrencesAtPositionListCount(expectedCount);
        };
        verify.prototype.documentHighlightsAtPositionContains = function (range, fileNamesToSearch, kind) {
            FourSlash.currentTestState.verifyDocumentHighlightsAtPositionListContains(range.fileName, range.start, range.end, fileNamesToSearch, kind);
        };
        verify.prototype.documentHighlightsAtPositionCount = function (expectedCount, fileNamesToSearch) {
            FourSlash.currentTestState.verifyDocumentHighlightsAtPositionListCount(expectedCount, fileNamesToSearch);
        };
        verify.prototype.completionEntryDetailIs = function (entryName, text, documentation, kind) {
            FourSlash.currentTestState.verifyCompletionEntryDetails(entryName, text, documentation, kind);
        };
        /**
         * This method *requires* a contiguous, complete, and ordered stream of classifications for a file.
         */
        verify.prototype.syntacticClassificationsAre = function () {
            var classifications = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                classifications[_i - 0] = arguments[_i];
            }
            FourSlash.currentTestState.verifySyntacticClassifications(classifications);
        };
        /**
         * This method *requires* an ordered stream of classifications for a file, and spans are highly recommended.
         */
        verify.prototype.semanticClassificationsAre = function () {
            var classifications = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                classifications[_i - 0] = arguments[_i];
            }
            FourSlash.currentTestState.verifySemanticClassifications(classifications);
        };
        verify.prototype.renameInfoSucceeded = function (displayName, fullDisplayName, kind, kindModifiers) {
            FourSlash.currentTestState.verifyRenameInfoSucceeded(displayName, fullDisplayName, kind, kindModifiers);
        };
        verify.prototype.renameInfoFailed = function (message) {
            FourSlash.currentTestState.verifyRenameInfoFailed(message);
        };
        verify.prototype.renameLocations = function (findInStrings, findInComments) {
            FourSlash.currentTestState.verifyRenameLocations(findInStrings, findInComments);
        };
        verify.prototype.verifyQuickInfoDisplayParts = function (kind, kindModifiers, textSpan, displayParts, documentation) {
            FourSlash.currentTestState.verifyQuickInfoDisplayParts(kind, kindModifiers, textSpan, displayParts, documentation);
        };
        verify.prototype.getSyntacticDiagnostics = function (expected) {
            FourSlash.currentTestState.getSyntacticDiagnostics(expected);
        };
        verify.prototype.getSemanticDiagnostics = function (expected) {
            FourSlash.currentTestState.getSemanticDiagnostics(expected);
        };
        verify.prototype.ProjectInfo = function (expected) {
            FourSlash.currentTestState.verifyProjectInfo(expected);
        };
        return verify;
    })(verifyNegatable);
    FourSlashInterface.verify = verify;
    var edit = (function () {
        function edit() {
        }
        edit.prototype.backspace = function (count) {
            FourSlash.currentTestState.deleteCharBehindMarker(count);
        };
        edit.prototype.deleteAtCaret = function (times) {
            FourSlash.currentTestState.deleteChar(times);
        };
        edit.prototype.replace = function (start, length, text) {
            FourSlash.currentTestState.replace(start, length, text);
        };
        edit.prototype.paste = function (text) {
            FourSlash.currentTestState.paste(text);
        };
        edit.prototype.insert = function (text) {
            this.insertLines(text);
        };
        edit.prototype.insertLine = function (text) {
            this.insertLines(text + '\n');
        };
        edit.prototype.insertLines = function () {
            var lines = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                lines[_i - 0] = arguments[_i];
            }
            FourSlash.currentTestState.type(lines.join('\n'));
        };
        edit.prototype.moveRight = function (count) {
            FourSlash.currentTestState.moveCaretRight(count);
        };
        edit.prototype.moveLeft = function (count) {
            if (typeof count === 'undefined') {
                count = 1;
            }
            FourSlash.currentTestState.moveCaretRight(count * -1);
        };
        edit.prototype.enableFormatting = function () {
            FourSlash.currentTestState.enableFormatting = true;
        };
        edit.prototype.disableFormatting = function () {
            FourSlash.currentTestState.enableFormatting = false;
        };
        return edit;
    })();
    FourSlashInterface.edit = edit;
    var debug = (function () {
        function debug() {
        }
        debug.prototype.printCurrentParameterHelp = function () {
            FourSlash.currentTestState.printCurrentParameterHelp();
        };
        debug.prototype.printCurrentFileState = function () {
            FourSlash.currentTestState.printCurrentFileState();
        };
        debug.prototype.printCurrentFileStateWithWhitespace = function () {
            FourSlash.currentTestState.printCurrentFileState(/*withWhiteSpace=*/ true);
        };
        debug.prototype.printCurrentFileStateWithoutCaret = function () {
            FourSlash.currentTestState.printCurrentFileState(/*withWhiteSpace=*/ false, /*withCaret=*/ false);
        };
        debug.prototype.printCurrentQuickInfo = function () {
            FourSlash.currentTestState.printCurrentQuickInfo();
        };
        debug.prototype.printCurrentSignatureHelp = function () {
            FourSlash.currentTestState.printCurrentSignatureHelp();
        };
        debug.prototype.printMemberListMembers = function () {
            FourSlash.currentTestState.printMemberListMembers();
        };
        debug.prototype.printCompletionListMembers = function () {
            FourSlash.currentTestState.printCompletionListMembers();
        };
        debug.prototype.printBreakpointLocation = function (pos) {
            FourSlash.currentTestState.printBreakpointLocation(pos);
        };
        debug.prototype.printBreakpointAtCurrentLocation = function () {
            FourSlash.currentTestState.printBreakpointAtCurrentLocation();
        };
        debug.prototype.printNameOrDottedNameSpans = function (pos) {
            FourSlash.currentTestState.printNameOrDottedNameSpans(pos);
        };
        debug.prototype.printErrorList = function () {
            FourSlash.currentTestState.printErrorList();
        };
        debug.prototype.printNavigationItems = function (searchValue) {
            if (searchValue === void 0) { searchValue = ".*"; }
            FourSlash.currentTestState.printNavigationItems(searchValue);
        };
        debug.prototype.printScriptLexicalStructureItems = function () {
            FourSlash.currentTestState.printScriptLexicalStructureItems();
        };
        debug.prototype.printReferences = function () {
            FourSlash.currentTestState.printReferences();
        };
        debug.prototype.printContext = function () {
            FourSlash.currentTestState.printContext();
        };
        return debug;
    })();
    FourSlashInterface.debug = debug;
    var format = (function () {
        function format() {
        }
        format.prototype.document = function () {
            FourSlash.currentTestState.formatDocument();
        };
        format.prototype.copyFormatOptions = function () {
            return FourSlash.currentTestState.copyFormatOptions();
        };
        format.prototype.setFormatOptions = function (options) {
            return FourSlash.currentTestState.setFormatOptions(options);
        };
        format.prototype.selection = function (startMarker, endMarker) {
            FourSlash.currentTestState.formatSelection(FourSlash.currentTestState.getMarkerByName(startMarker).position, FourSlash.currentTestState.getMarkerByName(endMarker).position);
        };
        format.prototype.setOption = function (name, value) {
            FourSlash.currentTestState.formatCodeOptions[name] = value;
        };
        return format;
    })();
    FourSlashInterface.format = format;
    var cancellation = (function () {
        function cancellation() {
        }
        cancellation.prototype.resetCancelled = function () {
            FourSlash.currentTestState.resetCancelled();
        };
        cancellation.prototype.setCancelled = function (numberOfCalls) {
            if (numberOfCalls === void 0) { numberOfCalls = 0; }
            FourSlash.currentTestState.setCancelled(numberOfCalls);
        };
        return cancellation;
    })();
    FourSlashInterface.cancellation = cancellation;
    var classification;
    (function (classification) {
        function comment(text, position) {
            return getClassification("comment", text, position);
        }
        classification.comment = comment;
        function identifier(text, position) {
            return getClassification("identifier", text, position);
        }
        classification.identifier = identifier;
        function keyword(text, position) {
            return getClassification("keyword", text, position);
        }
        classification.keyword = keyword;
        function numericLiteral(text, position) {
            return getClassification("numericLiteral", text, position);
        }
        classification.numericLiteral = numericLiteral;
        function operator(text, position) {
            return getClassification("operator", text, position);
        }
        classification.operator = operator;
        function stringLiteral(text, position) {
            return getClassification("stringLiteral", text, position);
        }
        classification.stringLiteral = stringLiteral;
        function whiteSpace(text, position) {
            return getClassification("whiteSpace", text, position);
        }
        classification.whiteSpace = whiteSpace;
        function text(text, position) {
            return getClassification("text", text, position);
        }
        classification.text = text;
        function punctuation(text, position) {
            return getClassification("punctuation", text, position);
        }
        classification.punctuation = punctuation;
        function docCommentTagName(text, position) {
            return getClassification("docCommentTagName", text, position);
        }
        classification.docCommentTagName = docCommentTagName;
        function className(text, position) {
            return getClassification("className", text, position);
        }
        classification.className = className;
        function enumName(text, position) {
            return getClassification("enumName", text, position);
        }
        classification.enumName = enumName;
        function interfaceName(text, position) {
            return getClassification("interfaceName", text, position);
        }
        classification.interfaceName = interfaceName;
        function moduleName(text, position) {
            return getClassification("moduleName", text, position);
        }
        classification.moduleName = moduleName;
        function typeParameterName(text, position) {
            return getClassification("typeParameterName", text, position);
        }
        classification.typeParameterName = typeParameterName;
        function parameterName(text, position) {
            return getClassification("parameterName", text, position);
        }
        classification.parameterName = parameterName;
        function typeAliasName(text, position) {
            return getClassification("typeAliasName", text, position);
        }
        classification.typeAliasName = typeAliasName;
        function getClassification(type, text, position) {
            return {
                classificationType: type,
                text: text,
                textSpan: position === undefined ? undefined : { start: position, end: position + text.length }
            };
        }
    })(classification = FourSlashInterface.classification || (FourSlashInterface.classification = {}));
})(FourSlashInterface || (FourSlashInterface = {}));
var fs;
(function (fs) {
    fs.test = new FourSlashInterface.test_();
    fs.goTo = new FourSlashInterface.goTo();
    fs.verify = new FourSlashInterface.verify();
    fs.edit = new FourSlashInterface.edit();
    fs.debug = new FourSlashInterface.debug();
    fs.format = new FourSlashInterface.format();
    fs.cancellation = new FourSlashInterface.cancellation();
})(fs || (fs = {}));
function verifyOperationIsCancelled(f) {
    FourSlash.verifyOperationIsCancelled(f);
}
var test = new FourSlashInterface.test_();
var goTo = new FourSlashInterface.goTo();
var verify = new FourSlashInterface.verify();
var edit = new FourSlashInterface.edit();
var debug = new FourSlashInterface.debug();
var format = new FourSlashInterface.format();
var cancellation = new FourSlashInterface.cancellation();
var classification = FourSlashInterface.classification;
