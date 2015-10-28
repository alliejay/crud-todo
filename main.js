$(document).ready(function () {
  page.init();
});

var page = {

  init: function () {
    page.initStyling();
    page.initEvents();
  },

  initStyling: function () {
    page.loadToDos(listData);
  },

  initEvents: function () {
    // ADDING NEW TASKS
    $('form').on('submit', function(event) {
      event.preventDefault();
      var newItem = {
        title: $('input[name="title"]').val()
      };
      listData.push(newItem);
      var itemId = listData.indexOf(newItem);
      newItem.id = itemId;
      page.loadTemplate($('.toDo'), newItem, $('#itemTmpl').html());
      $('.formDiv input').val('');
      page.activeItems();
    });

    // MARKING TASKS AS COMPLETE
    $('.toDo').on('click','input', function() {
        if($(this).is(':checked')) {
          $(this).siblings('h3').css('text-decoration', 'line-through');
        } else {
          $(this).siblings('h3').css('text-decoration', 'none');
        }
        page.activeItems();
    });

    // EDITTING TASKS
    $('.toDo').on('dblclick', 'h3', function() {
      $(this).addClass('hidden');
      $(this).siblings('input[type=text]').removeClass('hidden');
      $(this).siblings('button').removeClass('hidden');

      $('.toDo').on('click', 'button[name="submit"]', function (event) {
        event.preventDefault();
        var value = $(this).siblings('input[name="edit"]').val();
        $(this).siblings('h3').html(value);
        $(this).addClass('hidden');
        $(this).siblings('input[type=text]').addClass('hidden');
        $(this).siblings('h3').removeClass('hidden');
      })
      page.activeItems();
    });

    // DELETING ITEMS
    $('.listInfo').on('click', '#delete', function(event) {
      event.preventDefault();
      page.deleteItems();
    });
      page.activeItems();

    // VIEWING ACTIVE ITEMS
    $('.filtering').on('click', '#active', function(event) {
      event.preventDefault();
      page.activeTasks();
    });

    // VIEWING COMPLETED ITEMS
    $('.filtering').on('click', '#completed', function(event) {
      event.preventDefault();
      page.completedTasks();
    });

    // VIEWING ALL ITEMS
    $('.filtering').on('click', '#all', function(event) {
      event.preventDefault();
      page.allTasks();
    });

  },

  loadTemplate: function($el, data, tmpl) {
      var template = _.template(tmpl);
      var html = template(data);
      $el.append(html);
    },

  loadToDos: function(arr){
    _.each(arr, function(currEl, idx, arr) {
      currEl.id = idx;
      page.loadTemplate($('.toDo'), currEl, $('#itemTmpl').html());
    });
      page.activeItems();
  },

  activeItems: function() {
    var checked = $("input:checked").length;
    var remaining = (listData.length - checked);
    if(remaining === 1){
      $('#remainingItems').html(remaining + " item left")
    } else {
    $('#remainingItems').html(remaining + " items left");
    };
  },

  deleteItems: function() {
    if( $("input:checked") ) {
      $('input:checked').parent('article').html('');
    } else {
      console.log("Nothing to delete");
    };
  },

  activeTasks: function() {
    $('.toDo').children('article').removeClass('hidden');
    if( $("input:checked") ) {
      $('input:checked').parent('article').addClass('hidden');
    } else {
      console.log("");
    };
  },

  allTasks: function() {
    $('.toDo').children('article').removeClass('hidden');
  },

  completedTasks: function() {
    $('.toDo').children('article').removeClass('hidden');
    if( $('input:checked') ) {
      $('input:checkbox:not(:checked)').parent('article').addClass('hidden');
    } else {
      console.log("");
    }
  }

};
