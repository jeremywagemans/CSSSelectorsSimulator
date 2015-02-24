/**
 * Created by jeremywagemans on 09/02/15.
 */

// TODO - implement AngularJS

$(document).ready(function() {

    // Path to HTML templates
    var path = "views/templates/";

    // Object containing HTML templates
    var templates = {
        "tmplStructure": "structure.html",
        "tmplHandP": "headings.html",
        "tmplForms": "forms.html",
        "tmplTables": "tables.html",
        "tmplLists": "lists.html",
        "tmplCustom": "custom.html"
    };

    // Load default template (tmplStructure) and update editor & preview views
    $.ajax({url: path + templates.tmplStructure, success: function(data){
        updateEditor( data );
        updatePreview( data );
    }});

    // Listen clicks on template dropdown menu. Update preview & editor views with template selected
    $("#tmplMenu ul.dropdown-menu li").bind("click", function() {

        var template = $(this).attr('id');

        $.ajax({url: path + templates[template], success: function(data){
            updateEditor( data );
            updatePreview( data );
        }});

    });

    // Listen updates on main input. Display selection made by a css selector in preview view
    $( "#selector-input" ).bind( "input propertychange", function() {

        var selector = $(this).val();

        $("#code-preview .selected").removeClass("selected");


        if(selector.length != 0) {
            $("#code-preview " + selector).addClass("selected");
        }

    });

    // Listen when someone uses a tab to indent in editor
    $( "#code-editor" ).bind( "keydown", function( e ) {

        var keyCode = e.keyCode || e.which;

        if (keyCode == 9) {
            e.preventDefault();
            var start = $(this).get(0).selectionStart;
            var end = $(this).get(0).selectionEnd;

            // set textarea value to: text before caret + tab + text after caret
            $(this).val($(this).val().substring(0, start) + "\t" + $(this).val().substring(end));

            // put caret at right position again
            $(this).get(0).selectionStart = $(this).get(0).selectionEnd = start + 1;
        }

    });

    // TODO: Add colors to editor

    // Listen updates on editor's textarea
    $( "#code-editor" ).bind( "input propertychange", function() {

        var code = $(this).val();
        updatePreview(code);

    });

    function updateEditor( code ) {
        $("#code-editor").val(code);
    }

    function updatePreview( code ) {
        $("#code-preview").html(code);
    }

});
