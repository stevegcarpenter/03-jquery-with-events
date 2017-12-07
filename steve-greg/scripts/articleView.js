'use strict';

// REVIEW: Configure an object to hold all of our functions for dynamic updates and article-related event handlers.
let articleView = {};

articleView.populateFilters = function() {
  $('article').each(function() {
    // REVIEW: We can declare several variables at once and assign their values later when using let. Keep in mind that we cannot do this with const.
    let authorName, category, optionTag;
    if (!$(this).hasClass('template')) {
      // REVIEW: We need to take every author name from the page, and make it an option in the Author filter.
      // To do so, Build an <option> DOM element that we can append to the author <select> element.
      // Start by grabbing the author's name from `this` article element, and then use that bit of text to create the option tag (in a variable named `optionTag`) that we can append to the #author-filter select element.
      authorName = $(this).attr('data-author');

      // DONE: Refactor this concatenation using a template literal.
      optionTag = `<option value="${authorName}">${authorName}</option>`;

      //Insert generated option tag, unless the authors name is present alrady
      if ($('#author-filter option[value="' + authorName + '"]').length === 0) {
        $('#author-filter').append(optionTag);
      }

      // REVIEW: Similar to the above, but...
      // Avoid duplicates! We don't want to append the category name if the <select> already has this category as an option!
      category = $(this).attr('data-category');

      // DONE: Refactor this concatenation using a template literal.
      optionTag = `<option value="${category}">${category}</option>`;

      //Insert category tag unless already present.
      if ($('#category-filter option[value="' + category + '"]').length === 0) {
        $('#category-filter').append(optionTag);
      }
    }
  });
};

articleView.handleAuthorFilter = function() {
  $('#author-filter').on('change', function() {
    // REVIEW: Inside this function, "this" is the element that triggered the event handler function we are defining. "$(this)" is using jQuery to select that element (analogous to event.target that we have seen before), so we can chain jQuery methods onto it.
    console.log('Entered author filter');
    if ($(this).val()) {
      // DONE: If the <select> menu was changed to an option that has a value, we first need to hide all the articles, and then show just the ones that match for the author that was selected.
      // Use an "attribute selector" to find those articles, and fade them in for the reader.
      $('article').hide();
      let $filter = $(this)
      let author = $filter.val();
      // console.log('Author name:', author);
      $('article').each(function () {
        // If the author selected is the author of the currently selected article show it
        // let dataAuthor = $(this).attr('data-author');
        // console.log('data-author:', dataAuthor);
        if (author === $(this).attr('data-author')) {
          // console.log('Found match!, showing now.');
          // console.log('this:', $(this));
          $(this).show(300);
        }
      })
    } else {
      // DONE: If the <select> menu was changed to an option that is blank, we should first show all the articles, except the one article we are using as a template.
      $('article').not('.template').show(300);
      console.log('showing all articles but template');
    }
    $('#category-filter').val('');
  });
};

articleView.handleCategoryFilter = function() {
  $('#category-filter').on('change', function() {
    console.log('Entered category filter');
    if ($(this).val()) {
      $('article').hide();
      let $filter = $(this)
      let category = $filter.val();
      console.log('category name:', category);
      $('article').each(function () {
        // If the category selected is the category of the currently selected article show it
        let dataCategory = $(this).attr('data-category');
        console.log('data-category:', dataCategory);
        if (category === $(this).attr('data-category')) {
          console.log('Found match!, showing now.');
          console.log('this:', $(this));
          $(this).show();
        }
      })
    } else {
      $('article').not('.template').show(300);
      console.log('showing all articles but template');
    }
    $('#category-author').val('');
  });
};

articleView.handleMainNav = function() {
  // DONE: Add an event handler to .main-nav elements that will power the Tabs feature.
  // Clicking any .tab element should hide all the .tab-content sections, and then reveal the single .tab-content section that is associated with the clicked .tab element.
  // So: You need to dynamically build a selector string with the correct ID, based on the data available to you on the .tab element that was clicked.

  $('.main-nav .tab').on('click', function(){
    // console.log($(this));
    let contentDisplay = $(this).data('content');
    console.log(contentDisplay);
    $('.tab-content').hide();
    $(`#${contentDisplay}`).show();

    // Hide the template section
    $('section .template').hide();
  })
  // REVIEW: Now trigger a click on the first .tab element, to set up the page.
  $('.main-nav .tab:first').click();
};

articleView.setTeasers = function() {
  // REVIEW: Hide elements beyond the first 2 in any article body.
  $('.article-body *:nth-of-type(n+2)').hide();

  $('#articles').on('click', 'article .read-on', function (event) {
    event.preventDefault();
    console.log($(this));
    console.log('siblings:', $(this).siblings());
    console.log('body', $(this).siblings().filter('.article-body'));
    $(this).siblings().filter('.article-body').children().show();
    $(this).hide();
  })

  // DONE: Add an event handler to reveal all the hidden elements, when the .read-on link is clicked. You can go ahead and hide the "Read On" link once it has been clicked. Be sure to prevent the default link-click action!
  // Ideally, we'd attach this as just one event handler on the #articles section, and let it process (in other words... delegate) any .read-on clicks that happen within child nodes.
};

// DONE: Call all of the above functions, once we are sure the DOM is ready.
$(document).ready(function() {
  articleView.populateFilters();
  articleView.handleAuthorFilter();
  articleView.handleCategoryFilter();
  articleView.handleMainNav();
  articleView.setTeasers();
})
