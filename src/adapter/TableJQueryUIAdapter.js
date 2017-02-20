
( function(root, factory ) {
 if ( typeof define === "function" && define.amd ) {

    // AMD. Register as an anonymous module.
    define( ["jquery","../rup.base","../templates"], factory );
 } else {

    // Browser globals
    root.TableJQueryUIAdapter = factory( jQuery );
 }
} (this,  function( $ ) {

  function TableJQueryUIAdapter(){

  }

  TableJQueryUIAdapter.prototype.CONST = {
      core:{
        operations:{
          defaultOperations:{
            'add':{
                icon: "ui-icon rup-icon rup-icon-new"
            },
            'save': {
                icon: "ui-icon rup-icon rup-icon-save"
            },
            'edit': {
                icon: "ui-icon rup-icon rup-icon-edit"
            },
            'clone': {
                icon: "ui-icon rup-icon rup-icon-clone"
            },
            'delete': {
                icon: "ui-icon rup-icon rup-icon-delete"
            },
            'cancel': {
                icon: "ui-icon rup-icon rup-icon-cancel"
            }
          }
        }
      }
  };

  TableJQueryUIAdapter.prototype.addButton = function (obj, json_i18n) {

  };

  TableJQueryUIAdapter.prototype.createDetailNavigation = function () {
      var $self = $(this),
          settings = $self.data("settings"),
          jqGridID = $self.attr("id"),
          paginationBarTmpl = jQuery.rup.i18nParse(jQuery.rup.i18n.base, "rup_table.templates.detailForm.paginationBar"),
          paginationLinkTmpl = jQuery.rup.i18nParse(jQuery.rup.i18n.base, "rup_table.templates.detailForm.paginationLink"),
          elementCounterTmpl = jQuery.rup.i18nParse(jQuery.rup.i18n.base, "rup_table.templates.detailForm.elementCounter"),
          $separator = $(jQuery.rup.i18nParse(jQuery.rup.i18n.base, "rup_table.templates.detailForm.separator")),
          $elementCounter = $(jQuery.jgrid.format(elementCounterTmpl, jqGridID, jQuery.rup.STATICS, jQuery.rup.i18nParse(jQuery.rup.i18n.base, "rup_table.numResult"))),
          $paginationBar = $(jQuery.jgrid.format(paginationBarTmpl, jqGridID)),
          $firstPaginationLink = $(jQuery.jgrid.format(paginationLinkTmpl, 'first_' + jqGridID, jQuery.rup.i18nParse(jQuery.rup.i18n.base, "rup_table.first"))),
          $backPaginationLink = $(jQuery.jgrid.format(paginationLinkTmpl, 'back_' + jqGridID, jQuery.rup.i18nParse(jQuery.rup.i18n.base, "rup_table.previous"))),
          $forwardPaginationLink = $(jQuery.jgrid.format(paginationLinkTmpl, 'forward_' + jqGridID, jQuery.rup.i18nParse(jQuery.rup.i18n.base, "rup_table.next"))),
          $lastPaginationLink = $(jQuery.jgrid.format(paginationLinkTmpl, 'last_' + jqGridID, jQuery.rup.i18nParse(jQuery.rup.i18n.base, "rup_table.last"))),
          extpost = undefined;

      $paginationBar.append($firstPaginationLink)
          .append($backPaginationLink)
          .append($forwardPaginationLink)
          .append($lastPaginationLink);

      function doLinkNavigation(linkId, $link) {
          var retNavParams = $.proxy(settings.fncGetNavigationParams, $self)(linkId);

          if (!$link.hasClass("ui-state-disabled")) {
              if ($.proxy($.jgrid.checkUpdates, $self[0])(extpost, function () {
                      $.proxy(settings.doNavigation, $self)(retNavParams);
                  })) {
                  $.proxy(settings.doNavigation, $self)(retNavParams);
              }
          }
      }

      // Elemento primero
      $firstPaginationLink.on("click", function () {
          doLinkNavigation('first', $(this));
      });

      // Elemento anterior
      $backPaginationLink.on("click", function () {
          doLinkNavigation('prev', $(this));
      });

      // Elemento siguiente
      $forwardPaginationLink.on("click", function () {
          doLinkNavigation('next', $(this));
      });

      // Elemento ultimo
      $lastPaginationLink.on("click", function () {
          doLinkNavigation('last', $(this));
      });


      return $("<div>").append($elementCounter).append($paginationBar).append($separator);
  };


  return TableJQueryUIAdapter;
}));
