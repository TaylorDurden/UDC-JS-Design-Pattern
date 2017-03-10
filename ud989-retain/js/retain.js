$(function(){

  var model = {
    init: function() {
      if (!localStorage.notes) {
        localStorage.notes = JSON.stringify([]);
      }
    },
    add: function(note) {
      var notes = JSON.parse(localStorage.notes);
      notes.push({content: note, createdDate: new Date()});
      localStorage.notes = JSON.stringify(notes);
    },
    getNotes: function() {
      return JSON.parse(localStorage.notes);
    }
  };

  var octopus = {
    init: function() {
      model.init();
      view.init();
    },
    addNewNote: function(noteStr) {
      model.add(noteStr);
      view.render();
    },
    getAllNotes: function() {
      return model.getNotes().reverse();
    }
  };

  var view = {
    noteList: $('#notes'),
    init: function() {
      var newNoteForm = $('#new-note-form');
      var newNoteContent = $('#new-note-content');

      newNoteForm.submit(function(e) {
        octopus.addNewNote(newNoteContent.val());
        newNoteContent.val('');
        e.preventDefault();
      });
      this.render();
    },
    render: function() {
      var htmlStr = '';
      octopus.getAllNotes().forEach(function(note) {
        htmlStr += '<li class="note">' +
                note.content + '('+ note.createdDate +')'+
                '</li>';
      });
      this.noteList.html( htmlStr );
    }
  };

  octopus.init();
});
