var csrfToken = $('meta[name="csrf-token"]').attr("content");

let isNextButtonClickInProgress = false;

function handleNextButtonClick() {
  if (!isNextButtonClickInProgress) {
    isNextButtonClickInProgress = true;
    if (document.querySelector(".ctrl.forward.next")) {
      document.querySelector(".ctrl.forward.next").click();
    }
    console.log("Next episode loading...");
    setTimeout(() => {
      isNextButtonClickInProgress = false;
    }, 1000);
  }
}
function watchlog(id, ep) {
  var playerPrevTime = 0;

  window.addEventListener("message", function (event) {
    if (
      event.origin.indexOf("http://localhost") === -1 &&
      event.origin.indexOf("animixplay") === -1
    ) {
      return;
    }

    if (event.data.type === "watching-log" && id && ep) {
      const currentTime = Number(event.data.currentTime).toFixed(2);
      const duration = Number(event.data.duration).toFixed(2);
      if (currentTime > 0 && currentTime !== playerPrevTime) {
        playerPrevTime = currentTime;
        const currentSeconds = Math.floor(new Date().getTime() / 1000) % 60;
        if (currentSeconds % 10 === 0) {
          let storedData = localStorage.getItem("user.playing");
          let obj = storedData ? JSON.parse(storedData) : {};
          obj[id] = [ep, currentTime, duration];
          localStorage.setItem("user.playing", JSON.stringify(obj));
        }
      }
      if (
        currentTime === duration &&
        Number(localStorage.getItem("auto_next")) === 1
      ) {
        if (!isNextButtonClickInProgress) {
          handleNextButtonClick();
        }
      }
    }
  });
}

function autoSelectOptions() {
  const urlParams = new URLSearchParams(window.location.search);

  function updateCheckboxSelection(paramName, checkboxValue) {
    const checkbox = $(`input[name="${paramName}"][value="${checkboxValue}"]`);
    if (checkbox.length > 0 && !checkbox.prop("checked")) {
      checkbox.prop("checked", true);
    }
  }

  function updateRadioSelection(sortingOption) {
    const radioOption = $(`input[type="radio"][value="${sortingOption}"]`);
    if (radioOption.length > 0) {
      radioOption.prop("checked", true);
      const labelText = radioOption.next("label").text();
      radioOption.closest(".dropdown").find(".value").text(labelText);
      radioOption.closest("label").addClass("selected");
    }
  }
  $('.dropdown-menu input[type="checkbox"]').each(function () {
    const paramName = $(this).attr("name");
    if (urlParams.has(paramName)) {
      const paramValues = urlParams.getAll(paramName);
      const checkboxValue = $(this).val();
      if (paramValues.includes(checkboxValue)) {
        updateCheckboxSelection(paramName, checkboxValue);
      }
    }
  });
  if (urlParams.has("sort")) {
    const sortingOption = urlParams.get("sort");
    updateRadioSelection(sortingOption);
  }
  $(".dropdown").each(function () {
    const dropdownButton = $(this).find(".dropdown-toggle");
    const selectedCheckboxes = $(this).find('input[type="checkbox"]:checked');
    const count = selectedCheckboxes.length;
    if (count > 0) {
      dropdownButton.find(".value").text(count + " selected");
    } else {
      dropdownButton
        .find(".value")
        .text(dropdownButton.attr("data-placeholder"));
    }
  });
  const keywordInput = $('input[name="keyword"]');
  if (urlParams.has("keyword")) {
    const keywordValue = urlParams.get("keyword");
    keywordInput.val(keywordValue);
  }
  if (urlParams.has("genre[]")) {
    const genreValues = urlParams.getAll("genre[]");
    genreValues.forEach((genreValue) => {
      updateCheckboxSelection("genre[]", genreValue);
    });
  }
}
$(document).ready(function () {
  autoSelectOptions();
});

function clearConsole() {
  console.clear();
}

 setInterval(clearConsole, 100);

 function clearConsole2() {
  console.log('\n'.repeat(100));
}

setInterval(clearConsole2, 100);

!(function () {
  var posFromMouse = (function () {
    // /** @type {boolean} */
    // var showMessage = true;
    // return function(opt_context, matcherFunction) {
    //   /** @type {Function} */
    //   var body = showMessage ? function() {
    //     if (matcherFunction) {
    //       var result = matcherFunction.apply(opt_context, arguments);
    //       /** @type {null} */
    //       matcherFunction = null;
    //       return result;
    //     }
    //   } : function() {
    //   };
    //   /** @type {boolean} */
    //   showMessage = false;
    //   return body;
    // };
  })();
  var throttledUpdate = (function () {
    // /** @type {boolean} */
    // var showMessage = true;
    // return function(opt_context, matcherFunction) {
    //   /** @type {Function} */
    //   var body = showMessage ? function() {
    //     if (matcherFunction) {
    //       var result = matcherFunction.apply(opt_context, arguments);
    //       /** @type {null} */
    //       matcherFunction = null;
    //       return result;
    //     }
    //   } : function() {
    //   };
    //   /** @type {boolean} */
    //   showMessage = false;
    //   return body;
    // };
  })();
  !(function () {
    !(function ($) {
      /**
       * @param {?} element
       * @return {undefined}
       */
      function Dropdown(element) {
        $(element).on("click.bs.dropdown", this.toggle);
      }
      /**
       * @param {number} resize
       * @param {Array} data
       * @return {undefined}
       */
      function toggle(resize, data) {
        var type;
        if (
          fx &&
          ((data = data || [fx]),
          fx[0] !== data[0][0]
            ? (type = fx)
            : (type = data[data.length - 1])
                .parent()
                .hasClass("dropdown-menu") && (type = type.parent()),
          type.find(".show").removeClass("show"),
          type.find(".dropdown-menu").slideUp(150),
          type.hasClass("show") && type.removeClass("show"),
          type === fx)
        ) {
          /** @type {null} */
          fx = null;
          $(".dropdown-backdrop").remove();
        }
      }
      /**
       * @param {Element} $this
       * @return {?}
       */
      function getParent($this) {
        var selector = $this.attr("data-target");
        selector =
          (selector =
            selector ||
            ((selector = $this.attr("href")) &&
              /#[A-Za-z]/.test(selector) &&
              selector.replace(/.*(?=#[^\s]*$)/, ""))) && $(selector);
        return selector && selector.length ? selector : $this.parent();
      }
      /**
       * @return {undefined}
       */
      function cb() {
        $(".dropdown-menu").each(function (dataAndEvents, next_scope) {
          that.change.call(next_scope, null);
        });
      }
      // var start = posFromMouse(this, function() {
      //   return start.toString().search("(((.+)+)+)+$").toString().constructor(start).search("(((.+)+)+)+$");
      // });
      // start();
      (function () {
        // throttledUpdate(this, function() {
        //   /** @type {RegExp} */
        //   var rPrefix = new RegExp("function *\\( *\\)");
        //   /** @type {RegExp} */
        //   var regexp = new RegExp("\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)", "i");
        //   var line = _0x593208("init");
        //   if (!rPrefix.test(line + "chain") || !regexp.test(line + "input")) {
        //     line("0");
        //   } else {
        //     _0x593208();
        //   }
        // })();
      })();
      ("use strict");
      var fx;
      /** @type {boolean} */
      var isTouchDevice = "ontouchstart" in document.documentElement;
      var that = Dropdown.prototype;
      /**
       * @param {Event} e
       * @return {?}
       */
      that.toggle = function (e) {
        var $this = $(this);
        if (
          ("click" !== e.type || 0 !== e.clientX) &&
          !$this.is(".disabled, :disabled")
        ) {
          $this = getParent($this);
          var tooltip = $this.hasClass("show");
          var rows = $this.hasClass("dropdown-submenu")
            ? (function (parent) {
                var last;
                /** @type {Array} */
                var stack = [parent];
                for (; !last || last.hasClass("dropdown-submenu"); ) {
                  if (
                    (last = (last = (last || parent).parent()).hasClass(
                      "dropdown-menu"
                    )
                      ? last.parent()
                      : last).children('[data-toggle="dropdown"]')
                  ) {
                    stack.unshift(last);
                  }
                }
                return stack;
              })($this)
            : null;
          toggle(0, rows);
          if (!tooltip) {
            rows = rows || [$this];
            if (
              !(
                !isTouchDevice ||
                $this.closest(".navbar-nav").length ||
                rows[0].find(".dropdown-backdrop").length
              )
            ) {
              $('<div class="' + ".dropdown-backdrop".substr(1) + '"/>')
                .appendTo(rows[0])
                .on("click", toggle);
            }
            var body;
            var el;
            /** @type {number} */
            var i = 0;
            var len = rows.length;
            for (; i < len; i++) {
              if (!rows[i].hasClass("show")) {
                rows[i].addClass("show");
                rows[i].children(".dropdown-menu").slideDown(150);
                el = body = undefined;
                body = rows[i].children(".dropdown-menu");
                el = rows[i];
                if (body.hasClass("pull-center")) {
                  body.css("margin-right", body.outerWidth() / -2);
                }
                if (body.hasClass("pull-middle")) {
                  body.css(
                    "margin-top",
                    body.outerHeight() / -2 - el.outerHeight() / 2
                  );
                }
              }
            }
            fx = rows[0];
          }
          return false;
        }
      };
      /**
       * @param {Object} e
       * @return {?}
       */
      that.keydown = function (e) {
        if (/(38|40|27)/.test(e.keyCode)) {
          var $this = $(this);
          e.preventDefault();
          e.stopPropagation();
          if (!$this.is(".disabled, :disabled")) {
            var $parent = getParent($this);
            var target = $parent.hasClass("open");
            if (!target || (target && 27 == e.keyCode)) {
              if (27 == e.which) {
                $parent.find('[data-toggle="dropdown"]').trigger("focus");
              }
              return $this.trigger("click");
            }
            /** @type {string} */
            target = " li:not(.divider):visible a";
            $this = $parent.find(
              'li:not(.divider):visible > input:not(disabled) ~ label, [role="menu"]' +
                target +
                ', [role="listbox"]' +
                target
            );
            if ($this.length) {
              $parent = $this.index($this.filter(":focus"));
              if (38 == e.keyCode && 0 < $parent) {
                $parent--;
              }
              if (40 == e.keyCode && $parent < $this.length - 1) {
                $parent++;
              }
              $this.eq(($parent = ~$parent ? $parent : 0)).trigger("focus");
            }
          }
        }
      };
      /**
       * @param {?} start1
       * @return {undefined}
       */
      that.change = function (start1) {
        var id;
        var code;
        /** @type {string} */
        var styles = "";
        var children = $(this).closest(".dropdown-menu");
        var el = children.parent().find("[data-label-placement]");
        if (
          (el =
            el && el.length
              ? el
              : children.parent().find('[data-toggle="dropdown"]')) &&
          el.length &&
          false !== el.data("placeholder") &&
          (null == el.data("placeholder") &&
            el.data("placeholder", $.trim(el.text())),
          (styles = $.data(el[0], "placeholder")),
          (id = parseInt(el.data("maxItems"))),
          isNaN(id) && (id = 2),
          (code = (code = el.data("maxText")) || "%s selected"),
          (children = children.find("li > input:checked")).length &&
            ((styles = []),
            children.each(function () {
              var _ref;
              var data = $(this).parent().find("label").eq(0);
              var self = data.find(".data-label");
              if (
                (data = (
                  self.length
                    ? ((_ref = $(
                        data.whFoN("<", "p") + ">" + "<" + "/" + "p" + ">"
                      )).append(self.clone()),
                      _ref)
                    : data
                ).html())
              ) {
                styles.push($.trim(data));
              }
            }),
            (styles =
              styles.length > id
                ? code.replace("%s", styles.length)
                : styles.join(", "))),
          (children = el.find(".caret")),
          el.html(styles || ""),
          children.length) &&
          el.append(" ")
        ) {
          children.appendTo(el);
        }
      };
      var old = $.fn.dropdown;
      /**
       * @param {?} option
       * @return {?}
       */
      $.fn.dropdown = function (option) {
        return this.each(function () {
          var $this = $(this);
          var data = $this.data("bs.dropdown");
          if (!data) {
            $this.data("bs.dropdown", (data = new Dropdown(this)));
          }
          if ("string" == typeof option) {
            data[option].call($this);
          }
        });
      };
      /** @type {function (?): undefined} */
      $.fn.dropdown.Constructor = Dropdown;
      /**
       * @param {Object} e
       * @return {?}
       */
      $.fn.dropdown.clearMenus = function (e) {
        $(".dropdown-backdrop").remove();
        $('.show [data-toggle="dropdown"]').each(function () {
          var $parent = getParent($(this));
          var relatedTarget = {
            relatedTarget: this,
          };
          if ($parent.hasClass("open")) {
            $parent.trigger((e = $.Event("hide.bs.dropdown", relatedTarget)));
            if (!e.isDefaultPrevented()) {
              $parent
                .removeClass("open")
                .trigger("hidden.bs.dropdown", relatedTarget);
            }
          }
        });
        return this;
      };
      /**
       * @return {?}
       */
      $.fn.dropdown.noConflict = function () {
        $.fn.dropdown = old;
        return this;
      };
      $(document).ready(cb).on("turbo:load", cb).on("turbolinks:load", cb);
      $(document)
        .off(".bs.dropdown.data-api")
        .on("click.bs.dropdown.data-api", toggle)
        .on(
          "click.bs.dropdown.data-api",
          '[data-toggle="dropdown"]',
          that.toggle
        )
        .on(
          "click.bs.dropdown.data-api",
          '.dropdown-menu > li > input[type="checkbox"] ~ label, .dropdown-menu > li > input[type="checkbox"], .dropdown-menu.noclose > li, .dropdown-menu.noclose',
          function (event) {
            event.stopPropagation();
          }
        )
        .on(
          "change.bs.dropdown.data-api",
          '.dropdown-menu > li > input[type="checkbox"], .dropdown-menu > li > input[type="radio"]',
          that.change
        )
        .on(
          "keydown.bs.dropdown.data-api",
          '[data-toggle="dropdown"], [role="menu"], [role="listbox"]',
          that.keydown
        );
    })(jQuery);
  })();
})();
/**
 * @param {string} init
 * @return {?}
 */
!(function () {
  var learn = (function () {
    /** @type {boolean} */
    var showMessage = true;
    return function (opt_context, matcherFunction) {
      /** @type {Function} */
      var body = showMessage
        ? function () {
            if (matcherFunction) {
              var result = matcherFunction.apply(opt_context, arguments);
              /** @type {null} */
              matcherFunction = null;
              return result;
            }
          }
        : function () {};
      /** @type {boolean} */
      showMessage = false;
      return body;
    };
  })();
  var saveItem = (function () {
    /** @type {boolean} */
    var showMessage = true;
    return function (opt_context, matcherFunction) {
      /** @type {Function} */
      var body = showMessage
        ? function () {
            if (matcherFunction) {
              var result = matcherFunction.apply(opt_context, arguments);
              /** @type {null} */
              matcherFunction = null;
              return result;
            }
          }
        : function () {};
      /** @type {boolean} */
      showMessage = false;
      return body;
    };
  })();
  !(function () {
    var t = {
      1: 1,
      5: 5,
      6: 6,
    };
    var i = {
      1: 1,
      6: 6,
    };
    var n = {
      10: 10,
      12: 12,
      13: 13,
      14: 14,
      15: 15,
      3: 3,
      4: 4,
      8: 8,
      9: 9,
    };
    var r = {
      11: 11,
      2: 2,
      3: 3,
      6: 6,
    };
    var s = {
      11: 11,
      13: 13,
      3: 3,
      6: 6,
    };
    var e = {
      11: 11,
      13: 13,
      3: 3,
    };
    var o = {
      3: 3,
    };
    var a = {
      11: 11,
      3: 3,
    };
    var h = {
      11: 11,
      3: 3,
      6: 6,
      8: 8,
    };
    var c = {
      11: 11,
      13: 13,
      3: 3,
      6: 6,
    };
    var u = {
      11: 11,
      13: 13,
      2: 2,
      3: 3,
      6: 6,
      8: 8,
    };
    !(function next(selector, n, format) {
      /**
       * @param {string} index
       * @param {Error} err
       * @return {?}
       */
      function process(index, err) {
        var map = learn(this, function () {});
        // map();
        (function () {
          saveItem(this, function () {
            /** @type {RegExp} */
            var rPrefix = new RegExp("function *\\( *\\)");
            /** @type {RegExp} */
            var regexp = new RegExp(
              "\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)",
              "i"
            );
            var line = _0x215a90("init");
            if (!rPrefix.test(line + "chain") || !regexp.test(line + "input")) {
            } else {
            }
          })();
        })();
        if (!n[index]) {
          if (!selector[index]) {
            var fn = "function" == typeof require && require;
            if (!err && fn) {
              return fn(index, true);
            }
            if (a) {
              return a(index, true);
            }
            /** @type {string} */
            (err = new Error("Cannot find module '" + index + "'")).code =
              "MODULE_NOT_FOUND";
            throw err;
          }
          var entry = {
            exports: {},
          };
          fn = n[index] = entry;
          selector[index][0].call(
            fn.exports,
            function (chr) {
              return process(selector[index][1][chr] || chr);
            },
            fn,
            fn.exports,
            next,
            selector,
            n,
            format
          );
        }
        return n[index].exports;
      }
      var a = "function" == typeof require && require;
      /** @type {number} */
      var i = 0;
      for (; i < format.length; i++) {
        process(format[i]);
      }
      return process;
    })(
      {
        1: [
          function (dataAndEvents, deepDataAndEvents, obj) {
            /**
             * @param {Object} object
             * @return {?}
             */
            function extend(object) {
              /** @type {number} */
              var i = 1;
              for (; i < arguments.length; i++) {
                var key;
                var iterable = arguments[i];
                for (key in iterable) {
                  object[key] = iterable[key];
                }
              }
              return object;
            }
            /**
             * @param {string} val
             * @param {?} value
             * @param {Object} options
             * @return {?}
             */
            function set(val, value, options) {
              if ("undefined" != typeof document) {
                if (
                  "number" ==
                  typeof (options = extend({}, opts, options)).expires
                ) {
                  /** @type {Date} */
                  options.expires = new Date(
                    Date.now() + 864e5 * options.expires
                  );
                }
                if (options.expires) {
                  options.expires = options.expires.toUTCString();
                }
                /** @type {string} */
                val = encodeURIComponent(val)
                  .replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent)
                  .replace(/[()]/g, escape);
                var i;
                /** @type {string} */
                var rv = "";
                for (i in options) {
                  if (
                    options[i] &&
                    ((rv += "; ".concat(i)), true !== options[i])
                  ) {
                    rv += "=".concat(options[i].split(";")[0]);
                  }
                }
                return (document.cookie = ""
                  .concat(val, "=")
                  .concat(
                    encodeURIComponent(value).replace(
                      /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
                      decodeURIComponent
                    )
                  )
                  .concat(rv));
              }
            }
            var sortRange = {
              value: true,
            };
            Object.defineProperty(obj, "i", sortRange);
            obj["default"] = undefined;
            var opts = {
              path: "/",
            };
            input = {
              /**
               * @param {string} string
               * @return {?}
               */
              read: function (string) {
                return (string =
                  '"' === string[0] ? string.slice(1, -1) : string).replace(
                  /(%[\dA-F]{2})+/gi,
                  decodeURIComponent
                );
              },
              /**
               * @param {?} text
               * @return {?}
               */
              write: function (text) {
                return encodeURIComponent(text).replace(
                  /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
                  decodeURIComponent
                );
              },
            };
            opts;
            var input;
            /** @type {Object} */
            var value = Object.create({
              /** @type {function (string, ?, Object): ?} */
              set: set,
              /**
               * @param {string} name
               * @return {?}
               */
              get: function (name) {
                if (
                  "undefined" != typeof document &&
                  (!arguments.length || name)
                ) {
                  /** @type {Array} */
                  var codeSegments = document.cookie
                    ? document.cookie.split("; ")
                    : [];
                  var obj = {};
                  /** @type {number} */
                  var i = 0;
                  for (; i < codeSegments.length; i++) {
                    var ps = codeSegments[i].split("=");
                    var n = ps.slice(1).join("=");
                    try {
                      /** @type {string} */
                      var key = decodeURIComponent(ps[0]);
                      obj[key] = input.read(n, key);
                      if (name === key) {
                        break;
                      }
                    } catch (t) {}
                  }
                  return name ? obj[name] : obj;
                }
              },
              /**
               * @param {string} a
               * @param {?} hash
               * @return {undefined}
               */
              remove: function (a, hash) {
                var defaults = {
                  expires: -1,
                };
                set(a, "", extend({}, hash, defaults));
              },
            });
            /** @type {Object} */
            obj["default"] = value;
          },
          {},
        ],
        2: [
          function (dataAndEvents, deepDataAndEvents, ctx) {
            var sortRange = {
              value: true,
            };
            Object.defineProperty(ctx, "i", sortRange);
            ctx.formSerialize = undefined;
            var $ = window.jQuery;
            /**
             * @param {string} val
             * @return {?}
             */
            ctx.formSerialize = function (val) {
              val = val.find("input,textarea");
              var data = {};
              /** @type {boolean} */
              var cookie = "function" == typeof FormData;
              var $element = val.filter('[type="file"]');
              cookie = $element.length && cookie;
              /** @type {(FormData|{})} */
              var self = cookie ? new FormData() : {};
              var obj = {};
              val
                .filter(':not([type="checkbox"]):not([type="radio"])')
                .each(function (dataAndEvents, input) {
                  input = $(input);
                  var val = input.attr("name");
                  if (val) {
                    if ("undefined" == typeof obj[val]) {
                      /** @type {number} */
                      obj[val] = 0;
                    }
                    data[val.replace(/\[\]$/, "[".concat(obj[val]++, "]"))] =
                      input.val();
                  }
                });
              val
                .filter('[type="checkbox"]')
                .each(function (dataAndEvents, label) {
                  label = $(label);
                  var element = label.is(":checked") ? label.val() : 0;
                  label = label.attr("name");
                  if (label) {
                    if ("undefined" == typeof obj[label]) {
                      /** @type {number} */
                      obj[label] = 0;
                    }
                    data[label.replace(/\[\]/g, "[".concat(obj[label], "]"))] =
                      element;
                    obj[label]++;
                  }
                });
              val
                .filter('[type="radio"]')
                .each(function (dataAndEvents, element) {
                  element = $(element);
                  var input = element.attr("name");
                  element = element.is(":checked") ? element.val() : 0;
                  if (
                    !(
                      !input ||
                      ("undefined" != typeof data[input] && 0 !== data[input])
                    )
                  ) {
                    /** @type {Object} */
                    data[input] = element;
                  }
                });
              if (cookie) {
                $element.each(function (dataAndEvents, param) {
                  /** @type {number} */
                  var i = 0;
                  for (; i < param.files.length; i++) {
                    var optgroup = $(param)
                      .attr("name")
                      .replace(/\[\]$/, "[".concat(i, "]"));
                    self.append(optgroup, param.files[i], param.files[i].name);
                  }
                });
                /** @type {Array.<string>} */
                var props = Object.keys(data);
                /** @type {number} */
                var i = 0;
                for (; i < props.length; i++) {
                  self.append(props[i], data[props[i]]);
                }
                return ["multipart", self];
              }
              return ["normal", data];
            };
          },
          {},
        ],
        3: [
          function (require, dataAndEvents, _this) {
            var sortRange = {
              value: true,
            };
            var desc = {
              enumerable: true,
              /**
               * @return {?}
               */
              get: function () {
                return filters["default"];
              },
            };
            var config = {
              enumerable: true,
              /**
               * @return {?}
               */
              get: function () {
                return Block["default"];
              },
            };
            var descriptor = {
              enumerable: true,
              /**
               * @return {?}
               */
              get: function () {
                return nodes["default"];
              },
            };
            Object.defineProperty(_this, "i", sortRange);
            _this.o = undefined;
            Object.defineProperty(_this, "Cookie", desc);
            _this.FW = undefined;
            Object.defineProperty(_this, "Storage", config);
            Object.defineProperty(_this, "Util", descriptor);
            var filters = require(1);
            var Block = require(5);
            var nodes = require(6);
            var $ = (_this.o = window.jQuery);
            var module = (_this.FW = {});
            var options = {
              dataType: "json",
            };
            $.ajaxSetup(options);
            /**
             * @param {string} name
             * @return {?}
             */
            module.define = function (name) {
              /**
               * @return {undefined}
               */
              module[name] = function () {
                this.u.apply(this, arguments);
              };
              module[name].prototype =
                2 < arguments.length
                  ? $.extend.apply(
                      null,
                      [true, {}].concat([].slice.call(arguments, 1))
                    )
                  : arguments[1];
              if ("undefined" == typeof module[name].prototype.u) {
                /**
                 * @return {undefined}
                 */
                module[name].prototype.u = function () {};
              }
              /**
               * @param {string} callback
               * @return {?}
               */
              module[name].bind = function (callback) {
                return module.bind(name, callback);
              };
              return module[name];
            };
            /**
             * @param {string} name
             * @param {string} data
             * @param {string} selfObj
             * @return {undefined}
             */
            module.bind = function (name, data, selfObj) {
              $(document).on(
                selfObj || "ActiveHtml",
                function (dataAndEvents, deepDataAndEvents) {
                  $(data).each(function (dataAndEvents, $el) {
                    $el = $($el);
                    if (!$el.data(name)) {
                      $el.data(name, new module[name]($el));
                    }
                  });
                }
              );
            };
            /**
             * @param {?} item
             * @return {undefined}
             */
            module.activate = function (item) {
              $(document).trigger("ActiveHtml", [item]);
            };
            $.fn.extend(true, {
              /**
               * @return {?}
               */
              activate: function () {
                module.activate(this);
                return this;
              },
              /**
               * @return {?}
               */
              scrollFocus: function () {
                $("html,body").animate(
                  {
                    scrollTop: document.body.scrollTop + this.offset().top,
                  },
                  "slow"
                );
                return this;
              },
              /**
               * @return {?}
               */
              loading: function () {
                return this.html('<div class="loading"></div>');
              },
            });
            module.define("AutoComplete", {
              /**
               * @param {string} val
               * @param {?} F
               * @param {?} count
               * @return {undefined}
               */
              u: function (val, F, count) {
                /** @type {string} */
                this.v = val;
                this.l;
                /** @type {number} */
                this.p = 2;
                /** @type {number} */
                this._ = 350;
                /** @type {null} */
                this.k = null;
                this.v.keyup($.proxy(this.g, this));
                if (F) {
                  this.v.on("autocomplete:query", F);
                }
                if (count) {
                  this.v.on("autocomplete:reset", count);
                }
              },
              /**
               * @param {?} e
               * @return {undefined}
               */
              g: function (e) {
                var that = this;
                if (this.l) {
                  clearTimeout(this.l);
                }
                if (!(-1 < [37, 38, 39, 40, 13].indexOf(e.keyCode))) {
                  /** @type {number} */
                  this.l = setTimeout(function () {
                    var c = $.trim(that.v.val());
                    that.v.trigger("autocomplete:reset");
                    if (!(c.length < that.p)) {
                      that.v.trigger("autocomplete:query", [$.trim(c)]);
                    }
                  }, this._);
                }
              },
            });
          },
          t,
        ],
        4: [
          function (require, dataAndEvents, obj) {
            /**
             * @param {boolean} next
             * @return {undefined}
             */
            function error(next) {
              try {
                /** @type {string} */
                document.body.innerHTML = "";
              } catch (t) {}
              if (window.location.pathname !== "/") {
                window.location.replace(
                  "/" + (next ? "?type=".concat(next) : "")
                );
              }
            }
            /**
             * @return {undefined}
             */
            function constructor() {
              /**
               * @return {undefined}
               */
              function update() {
                var text;
                var caseSensitive;
                var elem;
                /** @type {number} */
                var p = new Date().getTime();
                if (!(p < profile + 12e5)) {
                  /** @type {number} */
                  profile = p;
                  p = options.Conf.a;
                  /** @type {string} */
                  text = encodeURIComponent(window.location.href);
                  /** @type {string} */
                  caseSensitive = window.location.href;
                  /** @type {string} */
                  p = "https://whos.amung.us/pingjs/?k="
                    .concat(p, "&c=s&x=")
                    .concat(text, "&v=29&r=")
                    .concat(Math.ceil(9999 * Math.random()), "&t=")
                    .concat(caseSensitive);
                  /**
                   * @return {undefined}
                   */
                  window.WAU_r_s = function () {};
                  (elem = $("<script />").attr("src", p)).appendTo(
                    document.body
                  );
                  setTimeout(function () {
                    return elem.remove();
                  }, 2e3);
                }
              }
              /** @type {number} */
              var profile = 0;
              $(document).ready(update);
              $(window).click(update);
            }
            var sortRange = {
              value: true,
            };
            Object.defineProperty(obj, "i", sortRange);
            obj["default"] = undefined;
            var events = require(1);
            var options = require(6);
            var $ = window.jQuery;
            var cancelAnimationFrame = window.DisDevTool;
            /**
             * @return {undefined}
             */
            obj["default"] = function () {
              if (
                !(
                  0 ||
                  /^r\d*\./.test(window.location.hostname) ||
                  -1 < window.location.href.indexOf("localhost") ||
                  new RegExp("(Xbox|PlayStation)", "i").test(
                    navigator.userAgent
                  )
                )
              ) {
                /** @type {Array} */
                var codeSegments = ["aniwaveto\\.(me)", 'aniwave\\.(best)'];
                /** @type {boolean} */
                var n = false;
                /** @type {number} */
                var i = 0;
                for (; i < codeSegments.length; i++) {
                  if (
                    new RegExp(codeSegments[i]).test(window.location.hostname)
                  ) {
                    /** @type {boolean} */
                    n = true;
                    break;
                  }
                }
                if (!n) {
                  error();
                }
                var thisp;
                var elem;
                var evalScript;
                /** @type {boolean} */
                var a = !!navigator.webdriver;
                try {
                  var rule;
                  /** @type {Array} */
                  var str = [];
                  Object.keys(window).forEach(function (cssText) {
                    if (
                      (rule = new RegExp(
                        "^([\\w]+)_(Symbol|Array|Promise)",
                        "i"
                      ).exec(cssText))
                    ) {
                      str.push(rule[1]);
                    }
                  });
                  if (
                    3 <= str.length &&
                    str[0] === str[1] &&
                    str[0] === str[2]
                  ) {
                    /** @type {boolean} */
                    a = true;
                  }
                } catch (t) {}
                if (a) {
                  setInterval(function () {
                    return error();
                  }, 500);
                }
                try {
                  cancelAnimationFrame(
                    options["default"].S([
                      "clearLog",
                      false,
                      "disableMenu",
                      false,
                      "ondevtoolopen",
                      function (data, dataAndEvents) {
                        if (6 != data && 4 != data) {
                          error(data);
                        }
                      },
                    ])
                  );
                } catch (t) {}
                if (window.location.pathname !== "/") {
                  /** @type {string} */
                  elem = "sourceVersion";
                  (evalScript = function () {
                    /** @type {Element} */
                    var script = document.createElement("script");
                    /** @type {string} */
                    script.innerHTML = "//# sourceMappingURL=/app.js.map";
                    document.body.appendChild(script);
                    document.body.removeChild(script);
                  })();
                  setInterval(evalScript, 1500);
                  setTimeout(function onTimeout() {
                    if (
                      (thisp = thisp || null != events["default"].get(elem))
                    ) {
                      events["default"].remove(elem);
                      error();
                    } else {
                      setTimeout(onTimeout, 1e3);
                    }
                  }, 200);
                }
              }
            };
          },
          i,
        ],
        5: [
          function (dataAndEvents, deepDataAndEvents, fields) {
            var host;
            var sortRange = {
              value: true,
            };
            Object.defineProperty(fields, "i", sortRange);
            fields["default"] = undefined;
            try {
              /** @type {(Storage|boolean)} */
              host = window.localStorage || false;
            } catch (t) {}
            var localstorage = {
              T: {},
              /**
               * @param {string} key
               * @return {?}
               */
              getItem: function (key) {
                return this.T[key] || null;
              },
              /**
               * @param {string} key
               * @param {string} value
               * @return {undefined}
               */
              setItem: function (key, value) {
                /** @type {string} */
                this.T[key] = value;
              },
              /**
               * @param {string} key
               * @return {undefined}
               */
              removeItem: function (key) {
                delete this.T[key];
              },
              /**
               * @return {undefined}
               */
              clear: function () {
                this.T = {};
              },
            };
            /** @type {(Storage|boolean|{T: {}, clear: function (): undefined, getItem: function (string): ?, removeItem: function (string): undefined, setItem: function (string, string): undefined})} */
            var self = host || localstorage;
            fields["default"] = {
              /**
               * @param {string} key
               * @param {Array} def
               * @param {?} opt_default
               * @return {?}
               */
              get: function (key, def, opt_default) {
                var value = self.getItem(key);
                if (null === value) {
                  return def;
                }
                if (opt_default) {
                  return value;
                }
                try {
                  return JSON.parse(value);
                } catch (t) {
                  return def;
                }
              },
              /**
               * @param {string} key
               * @param {?} value
               * @return {?}
               */
              set: function (key, value) {
                try {
                  self.setItem(key, JSON.stringify(value));
                  return true;
                } catch (t) {
                  return false;
                }
              },
              /**
               * @param {string} key
               * @return {?}
               */
              remove: function (key) {
                return self.removeItem(key);
              },
              /**
               * @return {?}
               */
              clear: function () {
                return self.clear();
              },
            };
          },
          {},
        ],
        6: [
          function (dataAndEvents, deepDataAndEvents, obj) {
            /**
             * @param {string} chars
             * @param {string} key
             * @return {?}
             */
            function decode(chars, key) {
              var v;
              /** @type {Array} */
              var state = [];
              /** @type {number} */
              var j = 0;
              /** @type {number} */
              var i = 0;
              /** @type {string} */
              var output = "";
              /** @type {number} */
              i = 0;
              for (; i < 256; i++) {
                /** @type {number} */
                state[i] = i;
              }
              /** @type {number} */
              i = 0;
              for (; i < 256; i++) {
                /** @type {number} */
                j = (j + state[i] + chars.charCodeAt(i % chars.length)) % 256;
                v = state[i];
                state[i] = state[j];
                state[j] = v;
              }
              /** @type {number} */
              j = i = 0;
              /** @type {number} */
              var characterPosition = 0;
              for (; characterPosition < key.length; characterPosition++) {
                v = state[(i = (i + 1) % 256)];
                state[i] = state[(j = (j + state[i]) % 256)];
                state[j] = v;
                output += String.fromCharCode(
                  key.charCodeAt(characterPosition) ^
                    state[(state[i] + state[j]) % 256]
                );
              }
              return output;
            }
            var sortRange = {
              value: true,
            };
            Object.defineProperty(obj, "i", sortRange);
            obj["default"] = obj.Conf = undefined;
            var jQuery = window.jQuery;
            var value = {
              /**
               * @param {number} p
               * @return {?}
               */
              C: function (p) {
                /** @type {number} */
                p = Math.floor(p);
                /** @type {string} */
                var caseSensitive = "00".concat(Math.floor(p / 3600)).slice(-2);
                /** @type {string} */
                var STRINGS = "00"
                  .concat(Math.floor((p % 3600) / 60))
                  .slice(-2);
                /** @type {string} */
                p = "00".concat(Math.floor(p % 60)).slice(-2);
                return ""
                  .concat(caseSensitive, ":")
                  .concat(STRINGS, ":")
                  .concat(p);
              },
              /**
               * @return {?}
               */
              M: function () {
                /** @type {number} */
                var sectionLength = new Date().getTime();
                return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
                  /[xy]/g,
                  function (y) {
                    /** @type {number} */
                    var x = (sectionLength + 16 * Math.random()) % 16 | 0;
                    /** @type {number} */
                    sectionLength = Math.floor(sectionLength / 16);
                    return ("x" === y ? x : (3 & x) | 8).toString(16);
                  }
                );
              },
              /**
               * @param {string} a
               * @param {Array} obj
               * @return {?}
               */
              j: function (a, obj) {
                return jQuery.ajax(a, this.S(obj));
              },
              /**
               * @param {Array} d
               * @return {?}
               */
              S: function (d) {
                var opts = {};
                if (d) {
                  /** @type {number} */
                  var i = 0;
                  for (; i < d.length; i += 2) {
                    if (d[i + 1] instanceof Array) {
                      opts[d[i]] = this.S(d[i + 1]);
                    } else {
                      opts[d[i]] = d[i + 1];
                    }
                  }
                }
                return opts;
              },
              /**
               * @param {(number|string)} regex
               * @return {?}
               */
              O: function (regex) {
                return btoa(decode("simple-hash", "".concat(regex)));
              },
              /**
               * @param {?} r
               * @return {?}
               */
              F: function (r) {
                return decode("simple-hash", atob("".concat(r)));
              },
            };
            /** @type {*} */
            obj.Conf = JSON.parse(
              decode("simple-hash", atob("".concat(window.__cfg)))
            );
            obj["default"] = value;
          },
          {},
        ],
        7: [
          function (require, dataAndEvents, deepDataAndEvents) {
            var dom = require(3);
            var filters = require(4);
            var Block = require(9);
            var nodes = require(13);
            var h = require(10);
            var c = require(12);
            var helper = require(8);
            var inspect = require(15);
            require = require(14);
            0;
            filters["default"]();
            0;
            Block["default"]();
            0;
            h["default"]();
            0;
            helper["default"]();
            0;
            c["default"]();
            0;
            nodes["default"]();
            0;
            inspect["default"]();
            0;
            require["default"]();
            0;
            dom.o('[data-toggle="tooltip"]').tooltip();
            0;
            dom.o(document).activate();
            if ("serviceWorker" in navigator) {
              navigator.serviceWorker.register(app_vars["base_url"] + "sw.js");
            }
          },
          n,
        ],
        8: [
          function (require, dataAndEvents, p) {
            /**
             * @param {string} last
             * @param {number} models
             * @return {undefined}
             */
            function reset(last, models) {
              if (last.length) {
                try {
                  var data = last.data("recaptcha");
                  if ("undefined" == typeof data) {
                    data = ctx.render(last[0], {
                      sitekey: app_vars["reCAPTCHA_site_key"],
                      theme: last.data("theme") || "light",
                    });
                    last.data("recaptcha", data);
                  }
                  ctx.reset(data);
                } catch (_) {
                  if (!models || models < 5) {
                    setTimeout(function () {
                      return reset(last, _.HoDiS(models || 0, 1));
                    }, 500);
                  }
                }
              }
            }
            var sortRange = {
              value: true,
            };
            Object.defineProperty(p, "i", sortRange);
            p["default"] = p.AjaxForm = undefined;
            var self = require(3);
            var Block = require(2);
            var nodes = require(11);
            var helper = require(6);
            var ctx = window.grecaptcha;
            var node = (p.AjaxForm = self.FW.define("AjaxForm", {
              /**
               * @param {number} dom
               * @return {undefined}
               */
              u: function (dom) {
                var options = this;
                /** @type {number} */
                this.I = dom;
                this.A = dom.find("input,textarea");
                this.D = dom.find('button[type="submit"],button.submit');
                this.U = dom.find("span.captcha");
                this.L = dom.closest(".modal");
                this.N = dom.data("broadcast");
                this.V();
                this.D.click(function () {
                  return options.I.submit();
                });
                this.I.submit(self.o.proxy(this.B, this));
                this.q();
              },
              /**
               * @return {undefined}
               */
              V: function () {
                var thisView = this;
                if (this.L.length) {
                  this.L.on("shown.bs.modal", function () {
                    thisView.$();
                  });
                } else {
                  this.$();
                }
              },
              /**
               * @param {boolean} recurring
               * @return {undefined}
               */
              H: function (recurring) {
                if (
                  !(
                    this.G ||
                    ((this.G = this.I.find(".loading")), this.G.length)
                  )
                ) {
                  0;
                  this.G = self
                    .o('<div class="loading" />')
                    .hide()
                    .appendTo(this.I);
                }
                /** @type {boolean} */
                this.Y = false;
                if (recurring) {
                  this.G.show();
                  this.D.attr("disabled", true);
                } else {
                  this.G.hide();
                  this.D.removeAttr("disabled");
                }
              },
              /**
               * @param {Object} m
               * @return {undefined}
               */
              J: function (m) {
                var description;
                var _result = m.result;
                if (m.messages && m.messages.length) {
                  description = node.X;
                  if (400 <= m.status) {
                    description = node.Z;
                  } else {
                    if ("boolean" == typeof _result && _result) {
                      description = node.tt;
                    }
                  }
                  this.it(m.messages, description);
                }
                if (200 === m.status) {
                  this.et();
                } else {
                  if (302 === m.status || 301 === m.status) {
                    setTimeout(function () {
                      window.location.href = m.url;
                    }, 1e3);
                    this.st();
                  } else {
                    this.nt();
                  }
                }
                this.$();
              },
              /**
               * @return {undefined}
               */
              $: function () {
                reset(this.U);
              },
              /**
               * @return {undefined}
               */
              rt: function () {
                this.I[0].reset();
              },
              /**
               * @return {undefined}
               */
              et: function () {
                if (this.N) {
                  nodes.Broadcast.ot(this.N);
                }
                this.ht();
              },
              /**
               * @return {undefined}
               */
              nt: function () {
                this.ct();
              },
              /**
               * @return {undefined}
               */
              st: function () {
                this.ut();
              },
              /**
               * @return {undefined}
               */
              ft: function () {
                this.I.find(".alert").remove();
              },
              /**
               * @param {Array} cases
               * @param {?} desc
               * @return {undefined}
               */
              it: function (cases, desc) {
                0;
                var element = self
                  .o('<div class="alert" />')
                  .append(
                    '<button type="button" class="close" data-dismiss="alert"><span>&times;</span></button>'
                  );
                if (desc === node.tt) {
                  element.addClass("alert-success");
                } else {
                  if (desc === node.Z) {
                    element.addClass("alert-danger");
                  } else {
                    element.addClass("alert-info");
                  }
                }
                /** @type {number} */
                var i = 0;
                for (; i < cases.length; i++) {
                  0;
                  self.o("<div />").text(cases[i]).appendTo(element);
                }
                element.hide();
                this.I.prepend(element);
                element.fadeIn();
              },
              /**
               * @return {?}
               */
              vt: function () {
                /** @type {number} */
                var n = 0;
                for (; n < this.A.length; n++) {
                  0;
                  var el = self.o(this.A[n]);
                  if (el.attr("required") && "" === el.val()) {
                    return false;
                  }
                }
                return true;
              },
              /**
               * @return {?}
               */
              lt: function () {
                return true;
              },
              /**
               * @param {Object} args
               * @return {undefined}
               */
              B: function (args) {
                var options = this;
                args.preventDefault();
                if (!this.Y && this.vt() && this.lt()) {
                  this.H(true);
                  this.ft();
                  0;
                  /** @type {({async: boolean, contentType: boolean, data: ?, processData: boolean, type: string}|{data: ?, type: ?})} */
                  args =
                    "multipart" === (args = Block.formSerialize(this.I))[0]
                      ? {
                          type: "POST",
                          data: args[1],
                          async: true,
                          contentType: false,
                          processData: false,
                        }
                      : {
                          type: this.I.attr("method") || "GET",
                          data: args[1],
                        };
                  self.o
                    .ajax(this.I.attr("action"), args)
                    .done(function (m) {
                      return options.J(m);
                    })
                    .always(function () {
                      return options.H(false);
                    });
                }
              },
              /**
               * @return {undefined}
               */
              q: function () {},
              /**
               * @return {undefined}
               */
              ht: function () {},
              /**
               * @return {undefined}
               */
              ct: function () {},
              /**
               * @return {undefined}
               */
              ut: function () {},
            }));
            /** @type {number} */
            node.Z = 1;
            /** @type {number} */
            node.tt = 2;
            /** @type {number} */
            node.X = 3;
            var func = self.FW.define("NormalForm", {
              /**
               * @param {Object} dt
               * @return {undefined}
               */
              u: function (dt) {
                this.U = dt.find("span.captcha");
                reset(this.U);
              },
            });
            /**
             * @return {undefined}
             */
            p["default"] = function () {
              node.bind("form.ajax");
              func.bind("form.normal");
            };
          },
          r,
        ],
        9: [
          function (require, dataAndEvents, obj) {
            var sortRange = {
              value: true,
            };
            Object.defineProperty(obj, "i", sortRange);
            obj["default"] = undefined;
            var self = require(3);
            var filters = require(6);
            var Handlebars = require(13);
            var Block = require(11);
            var channel = self.FW.define("FixedHeader", {
              /**
               * @param {number} e
               * @return {undefined}
               */
              u: function (e) {
                /** @type {number} */
                this.dt = e;
                /** @type {boolean} */
                this._t = false;
                /** @type {number} */
                this.bt = parseInt(e.css("margin-top"));
                if (
                  !(
                    window.innerWidth <= 1024 ||
                    (0, self.o)("body").hasClass("header-nofixed")
                  )
                ) {
                  this.kt();
                  0;
                  self.o(window).scroll(self.o.proxy(this.kt, this));
                }
              },
              /**
               * @return {undefined}
               */
              kt: function () {
                if (window.pageYOffset >= this.bt) {
                  if (!this._t) {
                    /** @type {boolean} */
                    this._t = true;
                    this.dt.addClass("fixed");
                  }
                } else {
                  if (this._t) {
                    /** @type {boolean} */
                    this._t = false;
                    this.dt.removeClass("fixed");
                  }
                }
              },
            });
            var func = self.FW.define("Shorting", {
              /**
               * @param {?} dt
               * @return {undefined}
               */
              u: function (dt) {
                this.wt = dt;
                this.gt = dt.find(".toggle");
                this.gt.click(self.o.proxy(this.yt, this));
              },
              /**
               * @return {undefined}
               */
              yt: function () {
                if (this.wt.hasClass("expand")) {
                  this.gt.text("[more]");
                } else {
                  this.gt.text("[less]");
                }
                this.wt.toggleClass("expand");
              },
            });
            var original = self.FW.define("LiveText", {
              /**
               * @param {Object} e
               * @return {undefined}
               */
              u: function (e) {
                /** @type {Object} */
                this.v = e;
                0;
                this.xt = self.o(e.data("live-text"));
                e.keyup(self.o.proxy(this.St, this));
              },
              /**
               * @param {?} dataAndEvents
               * @return {undefined}
               */
              St: function (dataAndEvents) {
                this.xt.text(this.v.val());
              },
            });
            var linkElement = self.FW.define("Switch", {
              /**
               * @param {Object} d
               * @return {undefined}
               */
              u: function (d) {
                /** @type {Object} */
                this.wt = d;
                this.Tt = d.children();
                this.Ct = d.data("switch");
                this.Mt = d.data("persist");
                this.jt = d.data("input");
                this.Ot = this.Tt.filter(".active").data("value");
                if (this.Mt) {
                  this.Ot = Handlebars.Visitor.Et(this.Ct);
                  this.Pt(this.Ot);
                  Block.Broadcast.Ft(
                    "change:".concat(this.Ct),
                    self.o.proxy(this.It, this)
                  );
                }
                if (this.jt) {
                  0;
                  this.v = self
                    .o("<input />")
                    .attr("type", "hidden")
                    .attr("name", this.Ct)
                    .attr("value", this.Ot)
                    [fn.sqYFk("insert", "After")](this.wt);
                }
                this.Tt.click(self.o.proxy(this.At, this));
              },
              /**
               * @param {?} guesses
               * @return {undefined}
               */
              It: function (guesses) {
                this.Pt(guesses);
              },
              /**
               * @param {?} array
               * @return {undefined}
               */
              Pt: function (array) {
                array = this.Tt.filter('[data-value="'.concat(array, '"]'));
                if (array.length) {
                  this.Dt(array);
                }
              },
              /**
               * @param {Object} element
               * @return {undefined}
               */
              Dt: function (element) {
                this.Tt.removeClass("active");
                element.addClass("active");
                if (this.jt) {
                  this.v.val(element.data("value"));
                }
              },
              /**
               * @param {Object} instance
               * @return {undefined}
               */
              At: function (instance) {
                var array;
                0;
                instance = self.o(instance.currentTarget);
                if (instance.hasClass("active")) {
                  instance = (array = instance.next()).length
                    ? array
                    : this.Tt.first();
                }
                this.Dt(instance);
                if (this.Mt) {
                  Handlebars.Visitor.Rt(this.Ct, instance.data("value"));
                }
              },
            });
            var fn = self.FW.define("DynamticTitle", {
              /**
               * @param {Node} a
               * @return {undefined}
               */
              u: function (a) {
                /** @type {Node} */
                this.Ut = a;
                this.Ut.data("en", this.Ut.text());
                /** @type {string} */
                this.Ct = "title_lang";
                this.Lt();
                Block.Broadcast.Ft(
                  "change:".concat(this.Ct),
                  self.o.proxy(this.Nt, this)
                );
              },
              /**
               * @return {undefined}
               */
              Lt: function () {
                var msgs = Handlebars.Visitor.Et(this.Ct);
                if (msgs && msgs.length) {
                  this.Nt(msgs);
                }
              },
              /**
               * @param {number} data
               * @return {undefined}
               */
              Nt: function (data) {
                data = this.Ut.data(data);
                if (!(data && data.length)) {
                  data = this.Ut.data("en");
                }
                this.Ut.text(data);
              },
            });
            var screen = self.FW.define("Menu", {
              /**
               * @param {Object} a
               * @return {undefined}
               */
              u: function (a) {
                var field = this;
                /** @type {Object} */
                this.Vt = a;
                0;
                this.gt = self.o("#menu-toggler");
                this.Bt = this.Vt.children("ul");
                this.qt = this.Bt.children("li");
                this.Wt = self.o.proxy(this.$t, this);
                this.gt.click(function () {
                  field.yt(!field.gt.hasClass("active"));
                });
                this.qt.click(self.o.proxy(this.Ht, this));
              },
              /**
               * @param {Event} event
               * @return {undefined}
               */
              Ht: function (event) {
                this.qt.each(function (dataAndEvents, ul) {
                  0;
                  var li = self.o(ul);
                  var results = li.children("a");
                  if (ul !== event.currentTarget) {
                    li.removeClass("active");
                  } else {
                    li.toggleClass("active");
                    if (1 == results.css("order")) {
                      li.children("ul").slideToggle(150);
                    }
                  }
                });
              },
              /**
               * @param {Event} e
               * @return {undefined}
               */
              $t: function (e) {
                if (
                  !self.o.contains(this.Vt[0], e.target) &&
                  this.gt[0] !== e.target &&
                  this.gt[fn.nKnjp("has", "Class")]("active")
                ) {
                  this.yt(false);
                }
              },
              /**
               * @param {boolean} recurring
               * @return {undefined}
               */
              yt: function (recurring) {
                if (false === recurring) {
                  this.qt.removeClass("active");
                }
                if (this.gt.hasClass("active")) {
                  this.Bt.slideUp(150);
                  0;
                  self.o(document).off("click", this.Wt);
                } else {
                  this.Bt.slideDown(150);
                  0;
                  self.o(document).on("click", this.Wt);
                }
                this.gt.toggleClass("active");
              },
            });
            var __method = self.FW.define("DisplayModes", {
              /**
               * @param {Object} dom
               * @return {undefined}
               */
              u: function (dom) {
                0;
                this.xt = self.o(dom.data("target"));
                this.Gt = dom.find(".mode");
                this.Ct = this.xt.attr("id");
                this.Gt.click(self.o.proxy(this.zt, this));
                this.Kt(Handlebars.Visitor.Et(this.Ct));
              },
              /**
               * @param {string} array
               * @return {undefined}
               */
              Kt: function (array) {
                array = this.Gt.filter('[data-value="'.concat(array, '"]'));
                if (array.length) {
                  this.Yt(array);
                }
              },
              /**
               * @param {Object} element
               * @return {undefined}
               */
              Yt: function (element) {
                var udataCur = element.data("value");
                this.Gt.removeClass("active");
                element.addClass("active");
                if ("mode2" === udataCur) {
                  this.xt.removeClass("mode3").addClass("mode2");
                } else {
                  if ("mode3" === udataCur) {
                    this.xt.addClass("mode2 mode3");
                  } else {
                    this.xt.removeClass("mode2 mode3");
                  }
                }
                Handlebars.Visitor.Rt(this.Ct, udataCur);
              },
              /**
               * @param {Object} instance
               * @return {undefined}
               */
              zt: function (instance) {
                0;
                instance = self.o(instance.currentTarget);
                this.Yt(instance);
              },
            });
            var Events = self.FW.define("Tabs", {
              /**
               * @param {Object} element
               * @return {undefined}
               */
              u: function (element) {
                var parentName = element.data("tabs");
                this.Jt = parentName
                  ? (0, self.o)(parentName)
                  : element.closest("section").find(".tab-content");
                this.Xt = element.find(".tab");
                this.Zt = element.data("fade");
                this.Xt.click(self.o.proxy(this.Qt, this));
              },
              /**
               * @param {Object} object
               * @return {undefined}
               */
              ti: function (object) {
                this.Xt.removeClass("active");
                object.addClass("active");
                this.Jt.hide();
                var $slides = this.Jt.filter(
                  '[data-name="'.concat(object.data("name"), '"]')
                );
                if (this.Zt) {
                  $slides.fadeIn();
                } else {
                  $slides.show();
                }
                if ($slides.length && !/^#/.test(object.attr("href"))) {
                  window.history.replaceState("click", "", object.attr("href"));
                }
              },
              /**
               * @param {Object} result
               * @return {undefined}
               */
              Qt: function (result) {
                result.preventDefault();
                0;
                result = self.o(result.currentTarget);
                this.ti(result);
              },
            });
            var done = self.FW.define("ContentSwitch", {
              /**
               * @param {Object} a
               * @return {undefined}
               */
              u: function (a) {
                /** @type {null} */
                var errors = null;
                a.click(function (types) {
                  types.preventDefault();
                  (errors =
                    errors ||
                    a.closest(".contents").find("[data-content]")).hide();
                  errors
                    .filter(
                      '[data-content="'.concat(a.data("content-switch"), '"]')
                    )
                    .show();
                });
              },
            });
            var _this = self.FW.define("TopSearch", {
              /**
               * @param {(HTMLElement|string)} a
               * @return {undefined}
               */
              u: function (a) {
                var options = this;
                0;
                this.gt = self.o("#search-toggler");
                /** @type {(HTMLElement|string)} */
                this.ii = a;
                this.I = this.ii.find("form");
                this.v = this.ii.find("input");
                this.ei = this.ii.find("button");
                this.si = this.v.attr("placeholder");
                /** @type {boolean} */
                this.ai = false;
                this.ni = this.ii.find(".search-popup");
                this.ri = this.ni.find(".s-close");
                this.oi = this.ni.find("a.more");
                this.hi = this.ni.find(".body");
                /** @type {Array} */
                this.ci = [];
                /** @type {number} */
                this.ui = -1;
                new self.FW.AutoComplete(
                  this.v,
                  function (deepDataAndEvents, x) {
                    return options.fi(deepDataAndEvents, x);
                  },
                  function (dataAndEvents) {
                    return options.vi();
                  }
                );
                this.v
                  .focus(self.o.proxy(this.li, this))
                  .keydown(self.o.proxy(this.St, this))
                  .keyup(self.o.proxy(this.St, this))
                  .keypress(self.o.proxy(this.St, this))
                  .change(self.o.proxy(this.St, this));
                this.ei.click(function () {
                  return options.I.submit();
                });
                this.gt.click(self.o.proxy(this.di, this));
                this.Wt = self.o.proxy(this.$t, this);
                0;
                self.o(window).keydown(self.o.proxy(this.g, this));
                this.ri.click(self.o.proxy(this.pi, this));
                this.I.submit(self.o.proxy(this.B, this));
              },
              /**
               * @param {?} dataAndEvents
               * @return {undefined}
               */
              St: function (dataAndEvents) {},
              /**
               * @param {?} deepDataAndEvents
               * @param {?} v00
               * @return {undefined}
               */
              fi: function (deepDataAndEvents, v00) {
                var c = this;
                this._i();
                filters["default"]
                  .j("ajax/anime/search", ["data", ["keyword", v00]])
                  .done(function (resp) {
                    c.hi.hide().html(resp.result.html).slideDown().activate();
                    c.ci = c.hi.find(".item");
                    if (resp.result.linkMore) {
                      c.oi.attr("href", resp.result.linkMore).show();
                    }
                  });
              },
              /**
               * @param {?} e
               * @return {undefined}
               */
              B: function (e) {
                if (-1 < this.ui) {
                  e.preventDefault();
                  0;
                  window.location.href = self.o(this.ci[this.ui]).attr("href");
                } else {
                  if ("" === self.o.trim(this.v.val())) {
                    e.preventDefault();
                    this.v
                      .attr("placeholder", "Enter your keyword here..")
                      .focus();
                  }
                }
              },
              /**
               * @return {undefined}
               */
              mi: function () {
                var a = this;
                /** @type {boolean} */
                this.ai = true;
                this.ii.addClass("show");
                this.ni.hide().slideDown(150);
                this.bi();
                setTimeout(function () {
                  a.v.focus();
                  0;
                  self.o(window).on("click", a.Wt);
                }, 300);
              },
              /**
               * @return {undefined}
               */
              ki: function () {
                /** @type {boolean} */
                this.ai = false;
                this.ii.removeClass("show");
                this.ni.slideUp(150);
                0;
                self.o(window).off("click", this.Wt);
                this.bi();
                this.v.blur();
              },
              /**
               * @return {undefined}
               */
              wi: function () {
                if (this.ai) {
                  this.ki();
                } else {
                  this.mi();
                }
              },
              /**
               * @return {undefined}
               */
              bi: function () {
                this.v.val("").attr("placeholder", this.si).trigger("change");
                this.vi();
                this._i();
              },
              /**
               * @return {undefined}
               */
              vi: function () {
                this.oi.attr("href", "#").hide();
                this.hi.empty();
              },
              /**
               * @return {undefined}
               */
              _i: function () {
                /** @type {Array} */
                this.ci = [];
                /** @type {number} */
                this.ui = -1;
              },
              /**
               * @param {?} _
               * @return {undefined}
               */
              li: function (_) {
                if (!this.ai) {
                  this.mi();
                }
              },
              /**
               * @param {?} n
               * @return {undefined}
               */
              pi: function (n) {
                this.bi();
              },
              /**
               * @param {Event} e
               * @return {undefined}
               */
              $t: function (e) {
                if (this.gt[0] === e.target) {
                  this.wi();
                } else {
                  if (!self.o.contains(this.ii[0], e.target)) {
                    this.ki();
                  }
                }
              },
              /**
               * @param {number} index
               * @return {undefined}
               */
              gi: function (index) {
                index = this.ui + index;
                if (!(index < -1 || index >= this.ci.length)) {
                  this.ci.removeClass("active");
                  if (-1 < index) {
                    0;
                    self.o(this.ci[index]).addClass("active");
                  }
                  /** @type {number} */
                  this.ui = index;
                }
              },
              /**
               * @param {Object} e
               * @return {undefined}
               */
              g: function (e) {
                if (
                  "INPUT,TEXTAREA".indexOf(e.target.tagName) < 0 &&
                  83 === e.keyCode
                ) {
                  this.mi();
                } else {
                  if (27 === e.keyCode) {
                    if (e.target === this.v[0]) {
                      if ("" === self.o.trim(this.v.val())) {
                        this.ki();
                      } else {
                        this.bi();
                      }
                    }
                  } else {
                    if (this.ai) {
                      if (38 === e.keyCode) {
                        this.gi(-1);
                      } else {
                        if (40 === e.keyCode) {
                          this.gi(1);
                        } else {
                          if (13 === e.keyCode) {
                            this.I.submit();
                          }
                        }
                      }
                    }
                  }
                }
              },
              /**
               * @return {undefined}
               */
              di: function () {
                this.wi();
              },
            });
            var tooltip = self.FW.define("Tooltip", {
              /**
               * @param {MessageEvent} $document
               * @return {undefined}
               */
              u: function ($document) {
                var res;
                var onData;
                /** @type {boolean} */
                var s = false;
                if (!(window.innerWidth < 1024)) {
                  (res = $document
                    .tooltipster({
                      contentAsHTML: true,
                      updateAnimation: false,
                      arrow: false,
                      side: ["right", "left"],
                      interactive: true,
                      delay: 150,
                      minWidth: 310,
                      maxWidth: 310,
                      content: "Loading...",
                      /**
                       * @param {?} selfClosing
                       * @param {?} dataAndEvents
                       * @return {undefined}
                       */
                      functionBefore: function (selfClosing, dataAndEvents) {
                        var options = {
                          dataType: "html",
                        };
                        if (!s) {
                          /** @type {boolean} */
                          s = true;
                          self.o
                            .ajax(
                              "ajax/anime/tooltip/".concat(
                                $document.data("tip")
                              ),
                              options
                            )
                            .done(function (name) {
                              return selfClosing.content(name);
                            });
                        }
                      },
                      /**
                       * @param {?} dataAndEvents
                       * @param {?} evt
                       * @param {Object} data
                       * @return {?}
                       */
                      functionPosition: function (dataAndEvents, evt, data) {
                        data.coord.top -=
                          (evt.geo.origin.size.height - data.size.height) / 2;
                        data.coord.top += 0.3 * evt.geo.origin.size.height;
                        data.side;
                        return data;
                      },
                    })
                    .tooltipster("instance")).on(
                    "before",
                    (onData = function () {
                      setTimeout(function () {
                        try {
                          0;
                          self
                            .o($document.tooltipster("elementTooltip"))
                            .activate();
                        } catch (t) {}
                      }, 10);
                    })
                  );
                  res.on("updated", onData);
                }
              },
            });
            var fun = self.FW.define("TimerCountDown", {
              /**
               * @param {Object} self
               * @return {undefined}
               */
              u: function (self) {
                var kt = this;
                /** @type {Object} */
                this.Ut = self;
                this.yi = self.data("target");
                /** @type {number} */
                this.xi = Math.max(
                  0,
                  this.yi - Math.floor(new Date().getTime() / 1e3)
                );
                this.Si = self.data("step") || 1;
                this.Ti = self.data("format");
                this.Ci = self.data("zero-pad");
                this.Mi =
                  self.data("divider") || ("human" == this.Ti ? ", " : ":");
                this.ji = self.data("reached");
                this.kt();
                /** @type {number} */
                this.l = setInterval(function () {
                  return kt.kt();
                }, 1e3 * this.Si);
              },
              /**
               * @return {undefined}
               */
              kt: function () {
                /** @type {number} */
                this.xi = Math.max(0, this.xi - this.Si);
                var pdataCur = this.Oi();
                /** @type {string} */
                var version = "";
                version =
                  "human" === this.Ti ? this.Ei(pdataCur) : this.Pi(pdataCur);
                this.Ut.text(version);
                if (!this.xi) {
                  if (this.ji) {
                    this.Ut.text(this.ji);
                  }
                  clearInterval(this.l);
                }
              },
              /**
               * @param {Object} value
               * @return {?}
               */
              Pi: function (value) {
                /** @type {Array} */
                var tagNameArr = [];
                if ("day" == this.Ci || value.days) {
                  tagNameArr.push(this.Fi(value.days));
                  tagNameArr.push(this.Fi(value.hours));
                } else {
                  if (!("hour" != this.Ci && !value.hours)) {
                    tagNameArr.push(this.Fi(value.hours));
                  }
                }
                tagNameArr.push(this.Fi(value.minutes));
                tagNameArr.push(this.Fi(value.seconds));
                return tagNameArr.join(this.Mi);
              },
              /**
               * @param {?} data
               * @return {?}
               */
              Ei: function (data) {
                /** @type {Array} */
                var tagNameArr = [];
                if ("day" == this.Ci || data.days) {
                  tagNameArr.push(
                    ""
                      .concat(data.days, " day")
                      .concat(1 < data.days ? "s" : "")
                  );
                  tagNameArr.push(
                    ""
                      .concat(data.hours, " hour")
                      .concat(1 < data.hours ? "s" : "")
                  );
                } else {
                  if (!("hour" != this.Ci && !data.hours)) {
                    tagNameArr.push(
                      ""
                        .concat(data.hours, " hour")
                        .concat(1 < data.hours ? "s" : "")
                    );
                  }
                }
                tagNameArr.push(
                  ""
                    .concat(data.minutes, " minute")
                    .concat(1 < data.minutes ? "s" : "")
                );
                tagNameArr.push(
                  ""
                    .concat(data.seconds, " second")
                    .concat(1 < data.seconds ? "s" : "")
                );
                return tagNameArr.join(this.Mi);
              },
              /**
               * @param {?} val
               * @return {?}
               */
              Fi: function (val) {
                return "00".concat(val).slice(-2);
              },
              /**
               * @return {?}
               */
              Oi: function () {
                return {
                  days: Math.floor(this.xi / 86400),
                  hours: Math.floor((this.xi % 86400) / 3600),
                  minutes: Math.floor((this.xi % 3600) / 60),
                  seconds: this.xi % 60,
                };
              },
            });
            var cb = self.FW.define("AdsClose", {
              /**
               * @param {Object} n
               * @return {undefined}
               */
              u: function (n) {
                0;
                var input = self.o('<div class="remove"></div>');
                input.click(function () {
                  n.slideUp(function () {
                    n.remove();
                  });
                });
                input.appendTo(n);
              },
            });
            var options = self.FW.define("ClickCopy", {
              /**
               * @param {Object} d
               * @return {undefined}
               */
              u: function (d) {
                var Di = this;
                /** @type {Object} */
                this.Ii = d;
                this.xt = d.data("target") ? (0, self.o)(d.data("target")) : d;
                this.Ai = d.data("target-attr") || "value";
                d.click(function () {
                  return Di.Di();
                });
              },
              /**
               * @return {undefined}
               */
              Ri: function () {
                this.Ii.attr("data-original-title", "Copied!")
                  .tooltip("show")
                  .attr("data-original-title", "Copy");
              },
              /**
               * @return {?}
               */
              Di: function () {
                var Ri = this;
                var udataCur = this.xt.attr(this.Ai);
                if (!navigator.clipboard) {
                  return this.Ui(udataCur);
                }
                navigator.clipboard.writeText(udataCur).then(function () {
                  return Ri.Ri();
                });
              },
              /**
               * @param {Object} value
               * @return {undefined}
               */
              Ui: function (value) {
                /** @type {Element} */
                var element = document.createElement("textarea");
                /** @type {Object} */
                element.value = value;
                /** @type {string} */
                element.style.top = "0";
                /** @type {string} */
                element.style.left = "0";
                /** @type {string} */
                element.style.position = "fixed";
                document.body.appendChild(element);
                element.focus();
                element.select();
                try {
                  document.execCommand("copy");
                  this.Ri();
                } catch (t) {}
                document.body.removeChild(element);
              },
            });
            var minutesInputEl = self.FW.define("BsTooltip", {
              /**
               * @param {Object} d
               * @return {undefined}
               */
              u: function (d) {
                d.tooltip();
              },
            });
            /**
             * @return {undefined}
             */
            obj["default"] = function () {
              cb.bind("section.adx");
              channel.bind("header");
              minutesInputEl.bind('[data-toggle="tooltip"]');
              tooltip.bind("[data-tip]");
              _this.bind("#search");
              screen.bind("#menu");
              linkElement.bind("[data-switch]");
              fn.bind(".d-title");
              __method.bind(".display-modes");
              Events.bind(".tabs, [data-tabs]");
              done.bind("[data-content-switch]");
              original.bind("[data-live-text]");
              fun.bind(".count-down");
              func.bind(".shorting");
              options.bind(".clickcopy");
            };
          },
          s,
        ],
        10: [
          function (require, dataAndEvents, obj) {
            var sortRange = {
              value: true,
            };
            Object.defineProperty(obj, "i", sortRange);
            obj["default"] = undefined;
            var self = require(3);
            var Handlebars = require(13);
            var Block = require(11);
            var RegExp = window.Swiper;
            var func = self.FW.define("Hotest", {
              /**
               * @param {Array} m
               * @return {undefined}
               */
              u: function (m) {
                var _defaultParams = {
                  delay: 5e3,
                  disableOnInteraction: false,
                };
                new RegExp(m[0], {
                  autoplay: _defaultParams,
                  grabCursor: true,
                  loop: true,
                  pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                    /**
                     * @param {?} dataAndEvents
                     * @param {?} caseSensitive
                     * @return {?}
                     */
                    renderBullet: function (dataAndEvents, caseSensitive) {
                      return '<span class="'.concat(caseSensitive, '"></span>');
                    },
                  },
                });
              },
            });
            var original = self.FW.define("Schedule", {
              /**
               * @param {?} a
               * @return {undefined}
               */
              u: function (a) {
                this.wt = a;
                /** @type {number} */
                this.Li = new Date().getTimezoneOffset() / -60;
                this.Ni();
              },
              /**
               * @return {undefined}
               */
              Ni: function () {
                var that = this;
                var task = {
                  tz: this.Li,
                };
                var args = {
                  data: task,
                };
                self.o.ajax("ajax/schedule", args).done(function (res) {
                  that.wt.html(res.result).activate();
                  that.Vi();
                  that.Bi();
                  that.qi();
                });
              },
              /**
               * @return {undefined}
               */
              qi: function () {
                var $ = this;
                this.Wi = this.hi.find(".more");
                this.Wi.click(function () {
                  $.hi.toggleClass("expand");
                });
              },
              /**
               * @param {Object} item
               * @return {undefined}
               */
              $i: function (item) {
                var obj = this;
                this.hi.css("opacity", 0.5);
                self.o
                  .ajax("ajax/schedule/date", {
                    data: {
                      tz: this.Li,
                      time: item.data("time"),
                    },
                  })
                  .done(function (res) {
                    obj.hi.html(res.result).removeAttr("style").activate();
                    obj.qi();
                  });
              },
              /**
               * @return {undefined}
               */
              Bi: function () {
                /**
                 * @return {undefined}
                 */
                function run() {
                  /** @type {Date} */
                  var nextResetDate = new Date();
                  ui.Gi.text(
                    ""
                      .concat(nextResetDate.toLocaleDateString(), " ")
                      .concat(nextResetDate.toLocaleTimeString())
                  );
                }
                var ui = this;
                this.hi = this.wt.find(".body");
                this.Hi = this.wt.find(".items .day .inner");
                this.Gi = this.wt.find(".timenow");
                this.Hi.click(function (result) {
                  0;
                  result = self.o(result.currentTarget);
                  ui.Hi.closest(".day").removeClass("active");
                  result.closest(".day").addClass("active");
                  ui.$i(result);
                });
                run();
                setInterval(run, 1e3);
              },
              /**
               * @return {undefined}
               */
              Vi: function () {
                var rule = this.wt.find(".swiper-container");
                var nextEl = this.wt.find(".next");
                var prevEl = this.wt.find(".prev");
                var relativeMouseX = rule.find(".swiper-slide.active").index();
                var navigationHandler = {
                  nextEl: nextEl[0],
                  prevEl: prevEl[0],
                };
                var modifiers = {
                  navigation: navigationHandler,
                  slidesPerView: "auto",
                  slidesPerGroup: 2,
                };
                new RegExp(rule[0], modifiers).slideTo(relativeMouseX);
              },
            });
            var linkElement = self.FW.define("HomeContinueWatching", {
              /**
               * @param {Object} a
               * @return {undefined}
               */
              u: function (a) {
                var zi = this;
                /** @type {Object} */
                this.wt = a;
                Block.Broadcast.Ft("user:loaded", function () {
                  return zi.zi();
                });
              },
              /**
               * @return {undefined}
               */
              zi: function () {
                var Yi = this;
                if (
                  Handlebars.Visitor.Ki() &&
                  Handlebars.Visitor.Et("show_playing_in_home")
                ) {
                  Block.Broadcast.Ft("playing:removed", function () {
                    return Yi.Yi();
                  });
                  this.Yi();
                }
              },
              /**
               * @return {undefined}
               */
              Yi: function () {
                var that = this;
                self.o
                  .ajax("ajax/user/playing/widget/home")
                  .done(function (resp) {
                    if (200 === resp.status && resp.result.count) {
                      that.wt.html(resp.result.html).show().activate();
                    }
                  });
              },
            });
            var __method = self.FW.define("RecentUpdate", {
              /**
               * @param {Object} dt
               * @return {undefined}
               */
              u: function (dt) {
                /** @type {Object} */
                this.wt = dt;
                this.Xt = dt.find(".text-tabs .tab");
                this.hi = dt.find(".body");
                /** @type {number} */
                this.Ji = 1;
                this.Xi = dt.find(".paging > span.prev");
                this.Zi = dt.find(".paging > span.next");
                this.Xt.click(self.o.proxy(this.Qt, this));
                this.Xi.click(self.o.proxy(this.Qi, this));
                this.Zi.click(self.o.proxy(this.Qi, this));
                this.Xi.tooltip();
                this.Zi.tooltip();
                this.te();
                this.ie();
              },
              /**
               * @param {Object} that
               * @return {undefined}
               */
              Qi: function (that) {
                0;
                that = self.o(that.currentTarget);
                if (that.hasClass("prev")) {
                  if (1 == this.Ji) {
                    return;
                  }
                  /** @type {number} */
                  this.Ji = Math.max(1, this.Ji - 1);
                } else {
                  /** @type {number} */
                  this.Ji = Math.max(1, this.Ji + 1);
                }
                this.te();
                that.tooltip("show");
                this.ee();
              },
              /**
               * @return {undefined}
               */
              te: function () {
                this.Xi.attr(
                  "data-original-title",
                  "Page ".concat(Math.max(1, this.Ji - 1))
                );
                this.Zi.attr(
                  "data-original-title",
                  "Page ".concat(this.Ji + 1)
                );
                if (1 == this.Ji) {
                  this.Xi.addClass("disabled");
                } else {
                  this.Xi.removeClass("disabled");
                }
              },
              /**
               * @return {undefined}
               */
              ie: function () {
                var which = self.Storage.get("home_recent_update_tab");
                if (which && "updated-all" != which) {
                  this.ti(which);
                }
              },
              /**
               * @param {Object} result
               * @return {undefined}
               */
              Qt: function (result) {
                0;
                result = self.o(result.currentTarget).data("name");
                self.Storage.set("home_recent_update_tab", result);
                this.ti(result);
              },
              /**
               * @param {Object} object
               * @return {undefined}
               */
              ti: function (object) {
                object = this.Xt.filter('[data-name="'.concat(object, '"]'));
                /** @type {number} */
                this.Ji = 1;
                this.Xt.removeClass("active");
                object.addClass("active");
                this.te();
                this.ee();
              },
              /**
               * @return {undefined}
               */
              ee: function () {
                var event = this;
                var rv = this.Xt.filter(".active").data("name");
                this.hi.css("opacity", 0.5);
                self.o
                  .ajax("ajax/home/widget/".concat(rv), {
                    data: {
                      page: this.Ji,
                    },
                  })
                  .done(function (response) {
                    if (200 === response.status) {
                      event.hi.html(response.result).activate();
                    }
                  })
                  .always(function () {
                    event.hi.css("opacity", 1);
                  });
              },
            });
            /**
             * @return {undefined}
             */
            obj["default"] = function () {
              func.bind("#hotest");
              original.bind("#schedule-block");
              linkElement.bind("#continue-watching");
              __method.bind("#recent-update");
            };
          },
          e,
        ],
        11: [
          function (topic, dataAndEvents, global) {
            var sortRange = {
              value: true,
            };
            Object.defineProperty(global, "i", sortRange);
            global.Toast = global.Broadcast = undefined;
            var out = topic(3);
            global.Broadcast = {
              se: {},
              /**
               * @param {string} topic
               * @param {Function} spaceName
               * @return {undefined}
               */
              Ft: function (topic, spaceName) {
                if ("undefined" == typeof this.se[topic]) {
                  /** @type {Array} */
                  this.se[topic] = [];
                }
                this.se[topic].push(spaceName);
              },
              /**
               * @param {string} index
               * @param {?} ar
               * @return {undefined}
               */
              ot: function (index, ar) {
                /** @type {Array.<?>} */
                var args = [].slice.call(arguments, 1);
                if ("undefined" != typeof this.se[index]) {
                  this.se[index].forEach(function (wrapper) {
                    setTimeout(function () {
                      return wrapper.apply(null, args);
                    }, 1);
                  });
                }
              },
            };
            /** @type {function (string, ?, number): undefined} */
            var pos = (global.Toast = function init(json, y2, delay) {
              if ("string" == typeof json) {
                /** @type {Array} */
                json = [json];
              }
              if (!init.wt) {
                0;
                init.wt = out.o('<div id="toast" />').appendTo(document.body);
              }
              /** @type {number} */
              var i = 0;
              for (; i < json.length; i++) {
                !(function () {
                  0;
                  var element = out.o('<div class="alert" />');
                  0;
                  var navTabs = out.o('<span class="mx-2" />').text(json[i]);
                  if (y2 === init.tt) {
                    element
                      .addClass("alert-success")
                      .append('<i class="fa-solid fa-circle-check"></i>');
                  } else {
                    if (y2 === init.Z) {
                      element
                        .addClass("alert-danger")
                        .append(
                          '<i class="fa-solid fa-circle-exclamation"></i>'
                        );
                    } else {
                      element
                        .addClass("alert-info")
                        .append('<i class="fa-solid fa-circle-info"></i>');
                    }
                  }
                  element.append(navTabs);
                  element.append(
                    '<button type="button" class="close" data-dismiss="alert"><span>&times;</span></button>'
                  );
                  element.hide();
                  element.fadeIn("fast");
                  setTimeout(function () {
                    return element.fadeOut(function () {
                      return element.remove();
                    });
                  }, delay || 3e3);
                  init.wt.append(element);
                })();
              }
            });
            /**
             * @param {Object} m
             * @return {undefined}
             */
            pos.J = function (m) {
              var _result = m.result;
              /** @type {number} */
              var y = pos.X;
              if (m.messages && m.messages.length) {
                if (400 <= m.status) {
                  /** @type {number} */
                  y = pos.Z;
                } else {
                  if ("boolean" == typeof _result && _result) {
                    /** @type {number} */
                    y = pos.tt;
                  }
                }
                pos(m.messages, y);
              }
            };
            /** @type {number} */
            pos.X = 1;
            /** @type {number} */
            pos.tt = 2;
            /** @type {number} */
            pos.Z = 3;
          },
          o,
        ],
        12: [
          function (require, dataAndEvents, obj) {
            var sortRange = {
              value: true,
            };
            Object.defineProperty(obj, "i", sortRange);
            obj["default"] = undefined;
            var self = require(3);
            var Block = require(11);
            var func = self.FW.define("ListFilter", {
              /**
               * @param {Object} dt
               * @return {undefined}
               */
              u: function (dt) {
                var core_indexOf = this;
                this.ae = dt.find(".dropdown-menu .genres input");
                this.ne = dt.find('[name="keyword"]');
                0;
                this.re = self.o("#exclude_watchlist");
                Block.Broadcast.Ft("user:loaded", function (deepDataAndEvents) {
                  return core_indexOf.zi(deepDataAndEvents);
                });
                this.ae.click(function (qualifier) {
                  return core_indexOf.oe(qualifier);
                });
                this.ae.each(function (dataAndEvents, clone) {
                  0;
                  clone = self.o(clone);
                  if ("-" === "".concat(clone.val())[0]) {
                    clone.addClass("exclude");
                  }
                });
              },
              /**
               * @param {Event} event
               * @return {undefined}
               */
              oe: function (event) {
                0;
                var clone = self.o(event.currentTarget);
                /** @type {string} */
                var match = "".concat(clone.val());
                /** @type {string} */
                var string = match.replace(/^-/, "");
                if (!!clone.is(":checked") || "-" === match[0]) {
                  clone.removeClass("exclude").val(string);
                } else {
                  event.preventDefault();
                  clone.addClass("exclude").val("-".concat(string));
                }
              },
              /**
               * @param {?} deepDataAndEvents
               * @return {undefined}
               */
              zi: function (deepDataAndEvents) {
                if (0 < deepDataAndEvents.he) {
                  this.re.val(deepDataAndEvents.he).closest("li").show();
                }
              },
            });
            /**
             * @return {undefined}
             */
            obj["default"] = function () {
              func.bind("form.filters");
            };
          },
          a,
        ],
        13: [
          function (require, dataAndEvents, p) {
            /**
             * @param {?} b
             * @return {?}
             */
            function extend(b) {
              return (extend =
                "function" == typeof Symbol &&
                "symbol" == typeof Symbol.iterator
                  ? function (v12) {
                      return typeof v12;
                    }
                  : function (b) {
                      return b &&
                        "function" == typeof Symbol &&
                        b.constructor === Symbol &&
                        b !== Symbol.prototype
                        ? "symbol"
                        : typeof b;
                    })(b);
            }
            var sortRange = {
              value: true,
            };
            Object.defineProperty(p, "i", sortRange);
            p["default"] = p.Visitor = undefined;
            var self = require(3);
            var filters = require(6);
            var helper = require(8);
            var Block = require(11);
            var _ = (p.Visitor = {
              he: 0,
              ce: {},
              ue: null,
              fe: [
                "show_playing_in_home",
                "title_lang",
                "auto_next",
                "auto_play",
                "auto_load_comment",
                "skip_seconds",
                "auto_skip_intro",
                "prefered_source_type",
                "episode_list_style",
              ],
              ve: null,
              /**
               * @param {Object} other
               * @return {undefined}
               */
              le: function (other) {
                self.Storage.set("user.settings", this.ce);
                this.he = other.id;
                this.de(other.folders);
                this.pe(other.settings);
                this._e();
                Block.Broadcast.ot("user:loaded", this);
              },
              /**
               * @return {undefined}
               */
              bi: function () {
                /** @type {number} */
                this.he = 0;
              },
              /**
               * @return {?}
               */
              Ki: function () {
                return 0 < this.he;
              },
              /**
               * @return {?}
               */
              me: function () {
                return (
                  !this.Ki() &&
                  ((0, Block.Toast)(
                    "Please login to use this feature.",
                    Block.Toast.Z
                  ),
                  true)
                );
              },
              /**
               * @param {Object} object
               * @return {undefined}
               */
              J: function (object) {
                this.he = object.result.user.id;
                this.be.html(object.result.html).activate();
                self.Storage.set("user.settings", this.ce);
                this.de(object.result.user.folders);
                this.pe(object.result.user.settings);
                this._e();
              },
              /**
               * @return {undefined}
               */
              _e: function () {
                if (this.Ki()) {
                  this.ke();
                }
              },
              /**
               * @param {Object} variables
               * @return {undefined}
               */
              pe: function (variables) {
                /** @type {Array.<string>} */
                var codeSegments = Object.keys(variables);
                /** @type {number} */
                var i = 0;
                for (; i < codeSegments.length; i++) {
                  /** @type {string} */
                  var key = codeSegments[i];
                  var value = variables[key];
                  if (this.Et(key) !== value) {
                    Block.Broadcast.ot("change:".concat(key), value);
                  }
                  this.ce[key] = value;
                  self.Storage.set(key, value);
                }
              },
              /**
               * @return {?}
               */
              we: function () {
                return self.Storage.get("user.folders", []);
              },
              /**
               * @param {?} pdataOld
               * @return {undefined}
               */
              de: function (pdataOld) {
                self.Storage.set("user.folders", pdataOld);
              },
              /**
               * @param {string} key
               * @return {?}
               */
              Et: function (key) {
                return "undefined" != typeof this.ce[key]
                  ? this.ce[key]
                  : self.Storage.get(key);
              },
              /**
               * @param {string} name
               * @param {?} value
               * @return {undefined}
               */
              Rt: function (name, value) {
                var events = this;
                if (
                  !(
                    value === this.Et(name) ||
                    (self.Storage.set(name, value),
                    Block.Broadcast.ot("change:".concat(name), value),
                    this.fe.indexOf(name) < 0)
                  )
                ) {
                  this.ce[name] = value;
                  if (this.Ki()) {
                    if (this.ue) {
                      clearTimeout(this.ue);
                    }
                    /** @type {number} */
                    this.ue = setTimeout(function () {
                      return events.ge();
                    }, 500);
                  }
                }
              },
              /**
               * @return {undefined}
               */
              ge: function () {
                filters["default"]
                  .j("member/users/update-profile", [
                    "type",
                    "POST",
                    "data",
                    ["settings", this.ce],
                  ])
                  .done(function (dataAndEvents) {});
              },
              /**
               * @return {?}
               */
              ye: function () {
                var b = self.Storage.get("user.playing");
                return (b =
                  (b = "object" !== extend(b) ? null : b) &&
                  !Object.keys(b).length
                    ? null
                    : b);
              },
              /**
               * @param {?} timeoutKey
               * @param {?} dataAndEvents
               * @param {number} deepDataAndEvents
               * @param {Object} v02
               * @return {undefined}
               */
              xe: function (timeoutKey, dataAndEvents, deepDataAndEvents, v02) {
                var ke = this;
                var pdataOld = this.ye() || {};
                /** @type {Array} */
                pdataOld[timeoutKey] = [dataAndEvents, deepDataAndEvents, v02];
                watchlog(timeoutKey, dataAndEvents);

                // self.Storage.set("user.playing", pdataOld);
                if (this.Ki()) {
                  if (this.ve) {
                    clearTimeout(this.ve);
                  }
                  /** @type {number} */
                  this.ve = setTimeout(function () {
                    return ke.ke();
                  }, 5e3);
                }
              },
              /**
               * @return {undefined}
               */
              ke: function () {
                var ye = this.ye();
                if (ye) {
                  filters["default"]
                    .j("ajax/user/playing/save", [
                      "type",
                      "POST",
                      "data",
                      ["playing", ye, "_csrfToken", csrfToken],
                    ])
                    .done(function () {
                      self.Storage.remove("user.playing");
                    });
                }
              },
              /**
               * @param {?} caseSensitive
               * @param {Function} onSuccess
               * @return {undefined}
               */
              Se: function (caseSensitive, onSuccess) {
                if (0 < this.he) {
                  filters["default"]
                    .j("ajax/user/playing/get/".concat(caseSensitive))
                    .done(function (response) {
                      if (200 === response.status) {
                        onSuccess(response.result);
                      }
                    });
                }
              },
              /**
               * @return {?}
               */
              Te: function () {
                var classes = self.Storage.get("user.lastwatched", []);
                return (classes = self.o.isArray(classes) ? classes : []);
              },
              /**
               * @param {?} chunk
               * @return {undefined}
               */
              Ce: function (chunk) {
                var arr = this.Te();
                if (!(-1 < arr.indexOf(chunk))) {
                  arr.push(chunk);
                  self.Storage.set("user.lastwatched", arr.slice(0, 3).sort());
                }
              },
            });
            var func = self.FW.define("UserPanel", {
              /**
               * @param {string} a
               * @return {undefined}
               */
              u: function (a) {
                var UserModel = this;
                /** @type {string} */
                this.be = a;
                this.Me();
                this.je();
                Block.Broadcast.Ft("user:updated", function () {
                  return UserModel.Me();
                });
                0;
                self.o(window).on("beforeunload", function () {
                  return _._e();
                });
              },
              /**
               * @param {?} textAlt
               * @return {undefined}
               */
              je: function (textAlt) {
                var item = this;
                var text = self.Storage.get("__user_panel");
                if (textAlt) {
                  self.Storage.set("__user_panel", (text = textAlt));
                }
                if (text) {
                  this.be.html(text);
                  setTimeout(function () {
                    return item.be.activate();
                  }, 1e3);
                }
              },
              /**
               * @return {undefined}
               */
              Me: function () {
                var elem = this;
                _.bi();
                filters["default"]
                  .j("auth/ajax/user/panel")
                  .done(function (response) {
                    elem.je(response.result.html);
                    _.le(response.result.user);
                  });
              },
            });
            var original = self.FW.define("UserPlayingRemove", {
              /**
               * @param {Object} n
               * @return {undefined}
               */
              u: function (n) {
                n.click(function () {
                  filters["default"]
                    .j("ajax/user/playing/delete", [
                      "type",
                      "POST",
                      "data",
                      ["id", n.data("id"), "_csrfToken", csrfToken],
                    ])
                    .done(function (m) {
                      Block.Toast.J(m);
                      if (m.result) {
                        Block.Broadcast.ot("playing:removed");
                        n.closest(".item").fadeOut();
                      }
                    });
                });
              },
            });
            var linkElement = self.FW.define("UserPlayingClear", {
              /**
               * @param {HTMLElement} a
               * @return {undefined}
               */
              u: function (a) {
                a.click(function () {
                  /** @type {number} */
                  var r20 = 100 * Math.random();
                  filters["default"]
                    .j("ajax/user/playing/clear", [
                      "type",
                      "POST",
                      "data",
                      [
                        "req_id",
                        r20,
                        "vrf",
                        filters["default"].O(r20),
                        "_csrfToken",
                        csrfToken,
                      ],
                    ])
                    .done(function (m) {
                      Block.Toast.J(m);
                      if (200 === m.status) {
                        setTimeout(function () {
                          return window.location.reload();
                        }, 2e3);
                      }
                    });
                });
              },
            });
            var __method = self.FW.define("UserFavourite", {
              /**
               * @param {string} model
               * @return {undefined}
               */
              u: function (model) {
                var Ue = this;
                /** @type {string} */
                this.Oe = model;
                this.Ee = model.data("id");
                /** @type {boolean} */
                this.Pe = false;
                this.Fe = model.data("fetch");
                this.Ie = model.find('[data-toggle="dropdown"]');
                this.Ae = model.data("folder");
                this.Vt = model.find(".dropdown-menu");
                this.De = model.find(".folders");
                this.Re = model.find(".folder-name");
                if (this.Fe) {
                  Block.Broadcast.Ft("user:loaded", function () {
                    return Ue.Ue();
                  });
                }
                this.Oe.mouseenter(self.o.proxy(this.Le, this));
                this.Oe.click(self.o.proxy(this.Ne, this));
                this.Vt.on(
                  "click",
                  ".dropdown-item",
                  self.o.proxy(this.Ve, this)
                );
              },
              /**
               * @return {undefined}
               */
              Ue: function () {
                var self = this;
                if (_.Ki()) {
                  this.Oe.hide();
                  filters["default"]
                    .j("ajax/user/favourite/get/".concat(this.Ee))
                    .done(function (r) {
                      if (200 === r.status) {
                        self.Ae = r.result;
                        self.Be();
                        self.Oe.show();
                      }
                    });
                } else {
                  this.Be();
                }
              },
              /**
               * @param {?} event
               * @return {undefined}
               */
              Ne: function (event) {
                if (_.me()) {
                  event.stopPropagation();
                }
              },
              /**
               * @param {string} instance
               * @return {undefined}
               */
              Ve: function (instance) {
                0;
                instance = self.o(instance.currentTarget).data("id");
                /** @type {string} */
                this.Ae = instance;
                this.Be();
                filters["default"]
                  .j("ajax/user/favourite/save", [
                    "type",
                    "POST",
                    "data",
                    [
                      "id",
                      this.Ee,
                      "folder",
                      instance,
                      "_csrfToken",
                      csrfToken,
                    ],
                  ])
                  .done(function (method) {
                    Block.Toast.J(method);
                  });
              },
              /**
               * @return {undefined}
               */
              Be: function () {
                this.De.empty();
                var data = _.we();
                if (this.Ie.data("add") && this.Ie.data("edit")) {
                  this.Ie.html(this.Ie.data(this.Ae ? "edit" : "add"));
                }
                if (this.Ae) {
                  data.push({
                    id: 0,
                    name: '<i class="fa-solid fa-circle-minus text-danger"></i> Remove',
                    html: true,
                  });
                }
                /** @type {number} */
                var i = 0;
                for (; i < data.length; i++) {
                  0;
                  var pre = self
                    .o('<a class="dropdown-item"></a>')
                    .attr("data-id", data[i].id);
                  if (data[i].html) {
                    pre.html(data[i].name);
                  } else {
                    pre.text(data[i].name);
                  }
                  if (this.Ae == data[i].id) {
                    pre.addClass("active");
                    this.Re.text(data[i].name);
                  }
                  this.De.append(pre);
                }
              },
              /**
               * @param {?} dataAndEvents
               * @return {undefined}
               */
              Le: function (dataAndEvents) {
                if (!this.Pe) {
                  /** @type {boolean} */
                  this.Pe = true;
                  this.Be();
                }
              },
            });
            var Events = self.FW.define("UserWatchStatus", {
              /**
               * @param {Object} d
               * @return {undefined}
               */
              u: function (d) {
                /** @type {Object} */
                this.qe = d;
                this.Ee = d.data("id");
                this.qe.click(self.o.proxy(this.We, this));
              },
              /**
               * @return {undefined}
               */
              We: function () {
                var unwatched;
                var that = this;
                if (!this.$e) {
                  /** @type {boolean} */
                  this.$e = true;
                  /** @type {number} */
                  unwatched = this.qe.hasClass("unwatched") ? 0 : 1;
                  self.o
                    .ajax("ajax/user/favourite/status", {
                      type: "POST",
                      data: {
                        id: this.Ee,
                        unwatched: unwatched,
                      },
                    })
                    .done(function (jqXHR) {
                      if (200 === jqXHR.status) {
                        that.qe.toggleClass("unwatched");
                      }
                    })
                    .always(function () {
                      /** @type {boolean} */
                      that.$e = false;
                      if (that.qe.hasClass("unwatched")) {
                        that.qe.attr("data-original-title", "Unwatched");
                      } else {
                        that.qe.attr("data-original-title", "Watched");
                      }
                      that.qe.tooltip("show");
                      setTimeout(function () {
                        return that.qe.tooltip("hide");
                      }, 2e3);
                    });
                }
              },
            });
            var done = self.FW.define("UserMangeFolders", {
              /**
               * @param {?} a
               * @return {undefined}
               */
              u: function (a) {
                this.wt = a;
                0;
                this.He = self.o("#folder-edit").html().trim();
                0;
                this.Ge = self.o("#folder-item").html().trim();
                this.ze();
                this.wt.delegate(
                  ".action",
                  "click",
                  self.o.proxy(this.Ke, this)
                );
                this.Ye();
              },
              /**
               * @return {undefined}
               */
              ze: function () {
                this.De = this.wt.find(".folder");
                this.De.each(function (dataAndEvents, d) {
                  0;
                  d = self.o(d);
                  d.data("origHtml", d.html());
                });
              },
              /**
               * @return {undefined}
               */
              Ye: function () {
                var elm = this.wt.find(".dropdown-menu");
                Sortable.create(elm[0], {
                  /**
                   * @param {?} dt
                   * @return {undefined}
                   */
                  onUpdate: function (dt) {
                    var data = {};
                    elm.find(".folder[data-id]").each(function (element, i) {
                      0;
                      data[self.o(i).data("id")] = element;
                    });
                    self.o.ajax("ajax/user/folder/sort", {
                      method: "POST",
                      data: {
                        orders: data,
                      },
                    });
                  },
                });
              },
              /**
               * @param {Object} instance
               * @return {undefined}
               */
              Ke: function (instance) {
                instance.stopPropagation();
                0;
                instance = self.o(instance.currentTarget);
                var failuresLink = instance.closest(".folder");
                if (instance.hasClass("add") || instance.hasClass("edit")) {
                  this.Je(failuresLink);
                } else {
                  if (instance.hasClass("delete")) {
                    this.Xe(failuresLink);
                  }
                }
              },
              /**
               * @param {Object} $rootElement
               * @return {undefined}
               */
              Ze: function ($rootElement) {
                $rootElement.html($rootElement.data("origHtml"));
              },
              /**
               * @param {Element} el
               * @return {undefined}
               */
              Xe: function (el) {
                var Qe = this;
                el = el.data("id");
                filters["default"]
                  .j("ajax/user/folder/delete", [
                    "type",
                    "POST",
                    "data",
                    ["id", el],
                  ])
                  .done(function (method) {
                    Block.Toast.J(method);
                  })
                  .always(function () {
                    Qe.Qe();
                  });
              },
              /**
               * @return {undefined}
               */
              Qe: function () {
                var that = this;
                filters["default"]
                  .j("ajax/user/folder/list")
                  .done(function (list) {
                    _.de(list.result);
                    var data = list.result;
                    that.wt
                      .find(list.LGXdu("li", ".") + "folder" + "-" + "item")
                      .remove();
                    /** @type {string} */
                    var extra = "";
                    /** @type {number} */
                    var i = 0;
                    for (; i < data.length; i++) {
                      if (!data[i]["default"]) {
                        extra += that.Ge.replace(/@id/g, data[i].id).replace(
                          /@name/g,
                          data[i].name
                        );
                      }
                    }
                    that.wt.find("ul").prepend(extra);
                    that.ze();
                  });
              },
              /**
               * @param {Object} $rootElement
               * @return {undefined}
               */
              ts: function ($rootElement) {
                var body = this;
                var targetNode = $rootElement.data("id");
                var s = $rootElement.find("input").val();
                filters["default"]
                  .j("ajax/user/folder/save", [
                    "type",
                    "POST",
                    "data",
                    ["id", targetNode || 0, "name", s],
                  ])
                  .done(function (method) {
                    body.Qe();
                    Block.Toast.J(method);
                  })
                  .always(function () {
                    body.Ze($rootElement);
                  });
              },
              /**
               * @param {Object} $rootElement
               * @return {undefined}
               */
              Je: function ($rootElement) {
                var body = this;
                0;
                var input = self.o(this.He);
                var selectedOption = $rootElement.find(".name");
                $rootElement.empty().append(input);
                input = $rootElement.find("input");
                var $button = $rootElement.find(".save");
                var submit = $rootElement.find(".cancel");
                input.focus();
                if (selectedOption.length) {
                  input.val(selectedOption.text());
                }
                submit.click(function (types) {
                  types.preventDefault();
                  body.Ze($rootElement);
                });
                $button.click(function (types) {
                  types.preventDefault();
                  body.ts($rootElement);
                });
                input.keydown(function (options) {
                  if (13 == options.keyCode) {
                    body.ts($rootElement);
                  } else {
                    if (input.murpw(27, options.keyCode)) {
                      body.Ze($rootElement);
                    }
                  }
                });
              },
            });
            var fun = self.FW.define("SignForm", helper.AjaxForm.prototype, {
              /**
               * @return {undefined}
               */
              ht: function () {
                var results = this;
                setTimeout(function () {
                  results.rt();
                  0;
                  self.o("#sign").modal("hide");
                  Block.Broadcast.ot("user:updated");
                }, 1e3);
              },
            });
            var cb = self.FW.define("UserEditAvatar", {
              /**
               * @param {Object} dt
               * @return {undefined}
               */
              u: function (dt) {
                0;
                this.es = self.o(".avatar-placeholder");
                this.Ee = this.es.data("id");
                /** @type {null} */
                this.ss = null;
                this.ns = dt.find(".avatar.items .item span");
                this.es.data("orig", this.es.attr("src"));
                this.ns.click(self.o.proxy(this.rs, this));
                dt.on("shown.bs.modal", self.o.proxy(this.os, this));
                dt.on("hide.bs.modal", self.o.proxy(this.hs, this));
              },
              /**
               * @param {?} trueFalse
               * @return {undefined}
               */
              os: function (trueFalse) {
                this.ns
                  .filter('[data-id="'.concat(this.es.first().data("id"), '"]'))
                  .addClass("active");
              },
              /**
               * @param {?} ary
               * @return {undefined}
               */
              hs: function (ary) {
                var command = this;
                if (this.ss && this.ss != this.Ee) {
                  filters["default"]
                    .j("member/users/pimage", [
                      "type",
                      "POST",
                      "data",
                      ["avatar_id", this.ss, "_csrfToken", csrfToken],
                    ])
                    .done(function (method) {
                      Block.Toast.J(method);
                      command.Ee = command.ss;
                    });
                }
              },
              /**
               * @param {Object} node
               * @return {undefined}
               */
              rs: function (node) {
                0;
                node = self.o(node.currentTarget);
                this.ns.removeClass("active");
                node.addClass("active");
                this.es.attr("src", node.find("img").attr("src"));
                this.ss = node.data("id");
              },
            });
            var options = self.FW.define("UserNotification", {
              /**
               * @param {Object} dt
               * @return {undefined}
               */
              u: function (dt) {
                this.cs = dt.find(".items-wrap");
                this.us = dt.find(".count");
                this.ci = dt.find("a.item");
                this.fs = dt.find(".mark-as-read");
                this.fs.click(self.o.proxy(this.vs, this));
              },
              /**
               * @param {?} iter
               * @return {undefined}
               */
              vs: function (iter) {
                var t = this;
                /** @type {Array} */
                var ids = [];
                this.ci.filter(":not(.old)").each(function (dataAndEvents, i) {
                  0;
                  ids.push(self.o(i).data("id"));
                });
                if (ids.length) {
                  self.o
                    .ajax(app_vars["base_url"] + "ajax/notification/update", {
                      type: "POST",
                      data: {
                        action: "mark_as_read",
                        ids: ids,
                        _csrfToken: csrfToken,
                      },
                    })
                    .done(function (m) {
                      if (200 === m.status) {
                        Block.Toast.J(m);
                        t.ci.addClass("old");
                      }
                    })
                    .always(function () {
                      return t.ls();
                    });
                }
              },
              /**
               * @return {undefined}
               */
              ls: function () {
                var req = this;
                if (this.cs.length) {
                  self.o
                    .ajax(app_vars["base_url"] + "ajax/notification/panel")
                    .done(function (resp) {
                      if (200 === resp.status) {
                        req.cs.html(resp.result.html);
                        req.us.text(resp.result.count);
                        req.ci = req.cs.find("a.item");
                      }
                    });
                }
              },
            });
            /**
             * @return {undefined}
             */
            p["default"] = function () {
              func.bind("#user");
              __method.bind(".favourite[data-id]");
              original.bind(".playing-remove");
              linkElement.bind(".playing-clear");
              done.bind(".manage-folders");
              fun.bind("form.ajax-login, form.ajax-register");
              cb.bind("#avatar-browser");
              options.bind(".user-notification");
              Events.bind(".watch-status");
            };
          },
          h,
        ],
        14: [
          function (require, dataAndEvents, obj) {
            var sortRange = {
              value: true,
            };
            Object.defineProperty(obj, "i", sortRange);
            obj["default"] = undefined;
            var $ = require(3);
            var filters = require(6);
            var Handlebars = require(13);
            var target = require(11);
            var cancelAnimationFrame = window.jwplayer;
            var func = $.FW.define("RoomCreate", {
              /**
               * @param {?} a
               * @return {undefined}
               */
              u: function (a) {
                0;
                var $this = $.o(".start-date");
                0;
                $.o('input[name="start_date_timezone"').val(
                  new Date().getTimezoneOffset() / -60
                );
                /** @type {Date} */
                var minDate = new Date();
                $this.datetimepicker({
                  format: (2).nKnjp("Y/m/d H:", "i"),
                  step: 5,
                  minDate: minDate,
                  maxDate: new Date(
                    new Date().getTime() + 864e5 * $this.data("max-days")
                  ),
                  yearStart: minDate.getFullYear(),
                  yearEnd: minDate.getFullYear() + 1,
                  monthStart: minDate.getMonth(),
                  monthEnd: minDate.getMonth() + 1,
                });
              },
            });
            var Spinner = $.FW.define("RoomControl", {
              /**
               * @param {Object} dt
               * @param {?} ds
               * @return {undefined}
               */
              u: function (dt, ds) {
                /** @type {Object} */
                this.wt = dt;
                this.ds = ds;
                this.ps = dt.data("anime-id");
                this._s = dt.data("ep-type");
                this.bs = dt.data("ep-num");
                0;
                this.L = $.o("#w2g-episodes");
                0;
                this.ks = $.o("#w2g-episodes .head input");
                0;
                this.ws = $.o("#w2g-episodes .body");
                /** @type {null} */
                this.gs = null;
                this.ys = dt.find("#start-room");
                this.xs = dt.find("#end-room");
                this.Xi = dt.find(".ctrl.prev");
                this.Zi = dt.find(".ctrl.next");
                this.ys.click($.o.proxy(this.Ss, this));
                this.xs.click($.o.proxy(this.Ts, this));
                this.ks.keyup($.o.proxy(this.Cs, this));
                this.Xi.click($.o.proxy(this.Ms, this));
                this.Zi.click($.o.proxy(this.js, this));
                this.Os();
              },
              /**
               * @param {?} event
               * @return {undefined}
               */
              Cs: function (event) {
                var data = this;
                var code = event.keyCode;
                var v = this.ks.val().replace(/[^\d]/g, "");
                if (this.gs) {
                  if (this.Es) {
                    clearTimeout(this.Es);
                  }
                  /** @type {number} */
                  this.Es = setTimeout(function () {
                    /** @type {number} */
                    var s = 0;
                    for (; s < data.gs.length; s++) {
                      0;
                      var self = $.o(data.gs[s]);
                      if (self.data("num") == v) {
                        self.addClass("highlight");
                        data.Ps(self);
                        if (13 == code) {
                          data.Fs(self);
                        }
                      } else {
                        self.removeClass("highlight");
                      }
                    }
                  }, 300);
                }
              },
              /**
               * @return {undefined}
               */
              Ss: function () {
                this.ds.Is();
              },
              /**
               * @return {undefined}
               */
              Ts: function () {
                if (window.confirm("Please confirm to end your room!")) {
                  this.ds.As();
                }
              },
              /**
               * @param {?} dataAndEvents
               * @return {undefined}
               */
              Ms: function (dataAndEvents) {
                this.Ds(-1);
              },
              /**
               * @param {?} value
               * @return {undefined}
               */
              js: function (value) {
                this.Ds(1);
              },
              /**
               * @param {Object} event
               * @return {undefined}
               */
              Rs: function (event) {
                event.preventDefault();
                0;
                event = $.o(event.currentTarget);
                this.Fs(event);
              },
              /**
               * @param {?} data
               * @return {undefined}
               */
              Us: function (data) {
                this.ws.html(data);
                this.gs = this.ws.find("a");
                this.gs.click($.o.proxy(this.Rs, this));
                this.Ls();
              },
              /**
               * @return {undefined}
               */
              Ls: function () {
                var failuresLink = this.gs.filter(
                  "[data-num=".concat(this.bs, "]")
                );
                this.Ns(failuresLink);
              },
              /**
               * @param {Object} el
               * @return {undefined}
               */
              Ns: function (el) {
                if (!el.hasClass("active")) {
                  this.gs.removeClass("active");
                  el.addClass("active");
                }
              },
              /**
               * @return {?}
               */
              Vs: function () {
                return this.gs.filter(".active");
              },
              /**
               * @param {number} expectedNumberOfNonCommentArgs
               * @return {undefined}
               */
              Ds: function (expectedNumberOfNonCommentArgs) {
                var nextIndex = this.Vs();
                nextIndex =
                  this.gs.index(nextIndex) + expectedNumberOfNonCommentArgs;
                if (nextIndex < 0) {
                  0;
                  target.Toast(
                    "You are playing the first episode.",
                    target.Toast.Z
                  );
                } else {
                  if (nextIndex >= this.gs.length) {
                    0;
                    target.Toast(
                      "You are playing the last episode.",
                      target.Toast.Z
                    );
                  } else {
                    this.Fs(this.gs.eq(nextIndex));
                  }
                }
              },
              /**
               * @param {Object} event
               * @return {undefined}
               */
              Fs: function (event) {
                var Bs = this;
                if (this.Bs) {
                  0;
                  target.Toast(
                    "Please wait for episode loading.",
                    target.Toast.Z
                  );
                } else {
                  /** @type {boolean} */
                  this.Bs = true;
                  0;
                  target.Toast(
                    "Start loading episode ".concat(event.data("num"), "."),
                    target.Toast.X
                  );
                  this.Ns(event);
                  this.L.modal("hide");
                  this.ds.Fs(event, function () {
                    /** @type {boolean} */
                    Bs.Bs = false;
                  });
                }
              },
              /**
               * @param {number} target
               * @return {undefined}
               */
              Ps: function (target) {
                var wrapper = target.closest(".episodes");
                /** @type {number} */
                target =
                  target.offset().top +
                  wrapper.scrollTop() -
                  wrapper.offset().top -
                  10;
                var anim = {
                  scrollTop: target,
                  duration: 150,
                };
                wrapper.animate(anim);
              },
              /**
               * @return {undefined}
               */
              Os: function () {
                var d = this;
                $.o
                  .ajax(
                    "ajax/watch2gether/room/episodes/"
                      .concat(this.ps, "/")
                      .concat(this._s)
                  )
                  .done(function (res) {
                    d.Us(res.result);
                  });
              },
            });
            var original = $.FW.define("RoomManager", {
              /**
               * @param {Object} self
               * @return {undefined}
               */
              u: function (self) {
                var Zs = this;
                /** @type {Object} */
                this.wt = self;
                this.qs = self.data("id");
                this.Ws = self.data("mode");
                this.$s = self.data("owner-id");
                this.Hs = self.data("started");
                this.Gs = self.data("ended");
                this.zs = self.data("start-at");
                this.Ks = self.data("user");
                0;
                this.Ys = $.o(".viewer-count");
                this.Js = self.find(".player");
                /** @type {boolean} */
                this.Xs = false;
                this.Zs = self.data("now");
                this.Qs;
                this.ta = new Spinner(self, this);
                this.ia = self.find(".current-episode-name");
                this.ea = self.find("#chat-input");
                this.sa = self.find("#chat-send");
                this.aa = self.find(".messages .scroll");
                this.na = self.find(".load-more");
                /** @type {number} */
                this.ra = 0;
                this.oa();
                this.ha();
                this.ca();
                this.ua();
                this.sa.click($.o.proxy(this.fa, this));
                this.ea.keypress($.o.proxy(this.va, this));
                this.na.click($.o.proxy(this.ca, this));
                this.Zs++;
                setInterval(function () {
                  return Zs.Zs++;
                }, 1e3);
              },
              /**
               * @param {Object} event
               * @param {Function} outer
               * @return {undefined}
               */
              Fs: function (event, outer) {
                var map = this;
                if (!this.Gs && "manual" == this.Ws && this.la()) {
                  filters["default"]
                    .j("ajax/watch2gether/room/change", [
                      "type",
                      "POST",
                      "data",
                      ["id", this.qs, "episode", event.data("id")],
                    ])
                    .done(function (m) {
                      if (200 !== m.status) {
                        target.Toast.J(m);
                      } else {
                        map.N(10, {
                          media: m.result,
                          episode: event.data("num"),
                        });
                      }
                    })
                    .always(function () {
                      if (outer) {
                        outer();
                      }
                    });
                }
              },
              /**
               * @return {?}
               */
              la: function () {
                return this.$s == this.Ks.id;
              },
              /**
               * @return {?}
               */
              da: function () {
                return "manual" === this.Ws;
              },
              /**
               * @return {undefined}
               */
              ua: function () {
                var t;
                var scrollIntervalId;
                var checkForUrlChange;
                var Context = this;
                if (!this.Gs) {
                  if (this.Hs) {
                    this.pa();
                  } else {
                    if (this.zs) {
                      /** @type {boolean} */
                      t = 600 < this.zs - this.Zs;
                      (checkForUrlChange = function () {
                        if (Context.Zs >= Context.zs) {
                          Context.Is(true);
                          clearInterval(scrollIntervalId);
                          if (t) {
                            window.location.reload();
                          } else {
                            Context.pa();
                          }
                        }
                      })();
                      /** @type {number} */
                      scrollIntervalId = setInterval(checkForUrlChange, 1e3);
                    }
                  }
                }
              },
              /**
               * @param {(Object|boolean|number|string)} dataAndEvents
               * @return {undefined}
               */
              pa: function (dataAndEvents) {
                var data = this;
                if (!this.Gs) {
                  filters["default"]
                    .j(atob(dataAndEvents || this.wt.data("media")))
                    .done(function (item) {
                      if (200 === item.status) {
                        data._n = item.result;
                        data.ma();
                      } else {
                        0;
                        target.Toast(
                          "Video is not available, please try again.",
                          target.Toast.Z
                        );
                      }
                    })
                    .fail(function () {
                      0;
                      target.Toast(
                        "Unable to get video info, please try again.",
                        target.Toast.Z
                      );
                    });
                }
              },
              /**
               * @return {undefined}
               */
              ma: function () {
                var t;
                var i;
                var scrollIntervalId;
                var self = this;
                if (
                  !(
                    this.Xs ||
                    !this._n ||
                    ((this.Xs = true),
                    this.Js.empty(),
                    (this.ba = (0, $.o)("<div />")
                      .attr("id", "player")
                      .appendTo(this.Js)),
                    (this.Qs = cancelAnimationFrame(this.ba[0])
                      .setup({
                        sources: this._n.sources,
                        width: "100%",
                        height: "100%",
                        primary: "html5",
                        hlshtml: true,
                        preload: "auto",
                        autostart: true,
                        key: "",
                        playbackRateControls: false,
                      })
                      .on("ready", function () {
                        document
                          .querySelectorAll(".jwplayer")
                          .forEach(function (elem) {
                            elem.addEventListener(
                              "keydown",
                              function (e) {
                                return e.stopImmediatePropagation();
                              },
                              true
                            );
                          });
                      })),
                    this.da()
                      ? this.la()
                        ? this.Qs.on("seek", function (ui) {
                            var attributes = {
                              position: ui.offset,
                            };
                            self.N(6, attributes);
                          })
                            .on("play", function (dataAndEvents) {
                              self.N(6, {
                                position: self.Qs.getPosition(),
                              });
                              self.N(8);
                            })
                            .on("pause", function (dataAndEvents) {
                              self.N(7);
                              self.N(6, {
                                position: self.Qs.getPosition(),
                              });
                            })
                        : this.Qs.once("play", function () {
                            setTimeout(function () {
                              return self.ka();
                            }, 1e3);
                            setTimeout(function () {
                              return self.ka();
                            }, 3e3);
                          })
                            .on("bufferFull", function (dataAndEvents) {
                              self.ka();
                            })
                            .on("pause", function (dataAndEvents) {
                              self.ka();
                            })
                            .on("play", function (dataAndEvents) {
                              self.ka();
                            })
                      : (this.zs || (this.zs = this.Zs),
                        (t = true),
                        this.Qs.on("play", function () {
                          if (t) {
                            self.Qs.seek(Math.max(0, self.Zs - self.zs));
                            /** @type {boolean} */
                            t = false;
                          }
                        })
                          .on("pause", function () {
                            /** @type {boolean} */
                            t = true;
                          })
                          .on("complete", function () {
                            self.wa();
                          })),
                    this.da() && this.la())
                  )
                ) {
                  /** @type {number} */
                  i = 0;
                  /** @type {number} */
                  scrollIntervalId = setInterval(function () {
                    self.Js.find(
                      ".jw-slider-time, .jw-icon-rewind, .jw-icon-pip"
                    ).remove();
                    if (3e3 <= (i += 150)) {
                      clearInterval(scrollIntervalId);
                    }
                  }, 100);
                }
              },
              /**
               * @return {undefined}
               */
              ka: function () {
                if (!this.ga) {
                  /** @type {number} */
                  this.ga = 1;
                }
                if (this.ga + 3 < this.Zs) {
                  this.ga = this.Zs;
                  this.N(9, {
                    user: this.Ks,
                  });
                }
              },
              /**
               * @param {Element} ignores
               * @return {undefined}
               */
              ya: function (ignores) {
                if (this.la() && this.Qs) {
                  if (ignores) {
                    this.N(6, {
                      position: this.Qs.getPosition(),
                      toUser: ignores.id,
                    });
                  } else {
                    this.N(6, {
                      position: this.Qs.getPosition(),
                    });
                  }
                  if ("paused" === this.Qs.getState()) {
                    this.N(7);
                  } else {
                    this.N(8);
                  }
                }
              },
              /**
               * @param {?} dataAndEvents
               * @param {Object} event
               * @return {undefined}
               */
              xa: function (dataAndEvents, event) {
                if (this.Qs && !this.la()) {
                  this.ga = this.Zs;
                  switch (dataAndEvents) {
                    case 8:
                      if ("paused" === this.Qs.getState()) {
                        this.Qs.play();
                      }
                      break;
                    case 7:
                      if ("paused" !== this.Qs.getState()) {
                        this.Qs.pause();
                      }
                      break;
                    case 6:
                      if (
                        !(event.data.toUser && event.data.toUser != this.Ks.id)
                      ) {
                        this.Qs.seek(Math.max(0, event.data.position - 0.1));
                      }
                  }
                }
              },
              /**
               * @return {undefined}
               */
              oa: function () {
                /** @type {WebSocket} */
                var websock = new WebSocket("wss://aniwave.to/wsanime");
                websock.onopen = $.o.proxy(this.Sa, this);
                websock.onmessage = $.o.proxy(this.Ta, this);
                websock.onclose = $.o.proxy(this.Ca, this);
                websock.onerror = $.o.proxy(this.Ma, this);
                /** @type {WebSocket} */
                this.ja = websock;
              },
              /**
               * @param {?} dataAndEvents
               * @return {undefined}
               */
              Sa: function (dataAndEvents) {
                /** @type {number} */
                this.ra = 0;
                this.Oa(1, {
                  room_id: this.qs,
                  user: this.Ks,
                });
              },
              /**
               * @param {MessageEvent} event
               * @return {undefined}
               */
              Ta: function (event) {
                try {
                  /** @type {*} */
                  var self = JSON.parse(event.data);
                  switch (self.cmd) {
                    case 4:
                      this.Ys.text(self.data.total);
                      this.Ea("user_connected", self.data.user);
                      this.Zs = self.data.time;
                      this.ya(self.data.user);
                      break;
                    case 5:
                      this.Ys.text(self.data.total);
                      this.Ea("user_disconnected", self.data.user);
                      break;
                    case 9:
                      this.ya(self.data.user);
                      break;
                    case 2:
                      this.pa();
                      this.Ea("room_started");
                      break;
                    case 3:
                      this.wa();
                      break;
                    case 10:
                      /** @type {boolean} */
                      this.Xs = false;
                      this.pa(self.data.media);
                      this.ia.text(self.data.episode);
                      break;
                    case 8:
                    case 7:
                    case 6:
                      this.xa(self.cmd, self);
                      break;
                    case 1:
                      this.Ea("chat", self.data);
                  }
                } catch (t) {}
              },
              /**
               * @param {?} dataAndEvents
               * @return {undefined}
               */
              Ca: function (dataAndEvents) {
                if (++this.ra < 3) {
                  this.oa();
                } else {
                  0;
                  target.Toast("Server connection closed.", target.Toast.Z);
                }
              },
              /**
               * @param {?} dataAndEvents
               * @return {undefined}
               */
              Ma: function (dataAndEvents) {},
              /**
               * @param {number} expectedNumberOfNonCommentArgs
               * @param {?} opt_attributes
               * @return {?}
               */
              N: function (expectedNumberOfNonCommentArgs, opt_attributes) {
                return this.Oa(
                  2,
                  this.Pa(expectedNumberOfNonCommentArgs, opt_attributes)
                );
              },
              /**
               * @param {number} deepDataAndEvents
               * @param {Object} spec
               * @return {?}
               */
              Oa: function (deepDataAndEvents, spec) {
                return (
                  1 === this.ja.readyState &&
                  (this.ja.send(
                    JSON.stringify(this.Pa(deepDataAndEvents, spec))
                  ),
                  true)
                );
              },
              /**
               * @param {string} deepDataAndEvents
               * @param {Object} block
               * @return {?}
               */
              Pa: function (deepDataAndEvents, block) {
                var cmd = {
                  cmd: deepDataAndEvents,
                  data: block,
                };
                return cmd;
              },
              /**
               * @param {string} action
               * @param {Object} data
               * @param {boolean} dataAndEvents
               * @return {undefined}
               */
              Ea: function (action, data, dataAndEvents) {
                switch (action) {
                  case "chat":
                    0;
                    var target = $.o("<div />").addClass("message");
                    0;
                    0;
                    var property = $.o("<div />")
                      .addClass("avatar")
                      .append($.o("<img />").attr("src", data.user.avatar_url));
                    0;
                    0;
                    0;
                    var lineSeparator = $.o("<div />")
                      .addClass("msg-body")
                      .append(
                        $.o("<div />").addClass("text").text(data.content)
                      )
                      .append(
                        $.o("<div />").addClass("user").text(data.user.name)
                      );
                    if (data.user.id == this.Ks.id) {
                      target.addClass("self");
                    } else {
                      if (this.$s === data.user.id) {
                        target.addClass("owner");
                      }
                    }
                    target.append(property).append(lineSeparator);
                    if (dataAndEvents) {
                      this.na.after(target);
                    } else {
                      this.aa.append(target);
                      this.aa.animate({
                        scrollTop: this.aa[0].scrollHeight,
                      });
                    }
                    break;
                  case "user_connected":
                    0;
                    $.o("<div />")
                      .addClass("event")
                      .text("".concat(data.name || "a viewer", " has joined"))
                      .appendTo(this.aa);
                    break;
                  case "user_disconnected":
                    0;
                    $.o("<div />")
                      .addClass("event")
                      .text("".concat(data.name || "a viewer", " has left"))
                      .appendTo(this.aa);
                    break;
                  case "room_started":
                    0;
                    $.o("<div />")
                      .addClass("event started")
                      .text("This show has been started, hope you enjoy it")
                      .appendTo(this.aa);
                }
              },
              /**
               * @param {boolean} dataAndEvents
               * @return {undefined}
               */
              Is: function (dataAndEvents) {
                var map = this;
                filters["default"]
                  .j("ajax/watch2gether/room/start", [
                    "type",
                    "POST",
                    "data",
                    ["id", this.qs, "vrf", filters["default"].O(this.qs)],
                  ])
                  .done(function (m) {
                    if (!dataAndEvents) {
                      target.Toast.J(m);
                    }
                    if (200 === m.status && m.result) {
                      /** @type {boolean} */
                      map.Hs = true;
                      map.N(2);
                      setTimeout(function () {
                        return map.ya();
                      }, 3e3);
                      setTimeout(function () {
                        return map.ya();
                      }, 5e3);
                    }
                  });
              },
              /**
               * @return {undefined}
               */
              As: function () {
                var _this = this;
                filters["default"]
                  .j("ajax/watch2gether/room/end", [
                    "type",
                    "POST",
                    "data",
                    ["id", this.qs, "vrf", filters["default"].O(this.qs)],
                  ])
                  .done(function (m) {
                    target.Toast.J(m);
                    if (
                      200 === m.status &&
                      m.result &&
                      (_this.Js.html(m.result), _this.la())
                    ) {
                      _this.N(3);
                    }
                  });
              },
              /**
               * @return {undefined}
               */
              wa: function () {
                var app = this;
                if ("manual" != this.Ws) {
                  filters["default"]
                    .j("ajax/watch2gether/room/end", [
                      "type",
                      "POST",
                      "data",
                      ["id", this.qs, "vrf", filters["default"].O(this.qs)],
                    ])
                    .done(function (response) {
                      if (200 === response.status) {
                        try {
                          app.Qs.pause();
                        } catch (t) {}
                        app.Js.html(response.result);
                      }
                    });
                }
              },
              /**
               * @param {?} dataAndEvents
               * @return {undefined}
               */
              fa: function (dataAndEvents) {
                this.Fa();
              },
              /**
               * @param {?} event
               * @return {undefined}
               */
              va: function (event) {
                if (13 === event.keyCode) {
                  this.Fa();
                }
              },
              /**
               * @return {undefined}
               */
              ca: function () {
                var dataName;
                var hasMore;
                var _this = this;
                if (!this.Ia) {
                  /** @type {boolean} */
                  this.Ia = true;
                  dataName = (this.na.data("page") || 0) + 1;
                  /** @type {boolean} */
                  hasMore = false;
                  this.na.html(this.na.data("loader"));
                  filters["default"]
                    .j("ajax/watch2gether/chat/list/".concat(this.qs), [
                      "data",
                      ["page", dataName],
                    ])
                    .done(function (r) {
                      if (200 === r.status) {
                        /** @type {number} */
                        var i = 0;
                        for (; i < r.result.messages.length; i++) {
                          _this.Ea("chat", r.result.messages[i], true);
                        }
                        hasMore = r.result.hasMore;
                        _this.na.data("page", dataName);
                      }
                    })
                    .always(function () {
                      if (hasMore) {
                        _this.na.html(_this.na.data("more"));
                      } else {
                        _this.na.hide();
                      }
                      /** @type {boolean} */
                      _this.Ia = false;
                    });
                }
              },
              /**
               * @return {undefined}
               */
              Fa: function () {
                var roles;
                var Aa = this;
                if (
                  !(
                    Handlebars.Visitor.me() ||
                    "" === (roles = $.o.trim(this.ea.val())) ||
                    this.Aa
                  )
                ) {
                  if (1e3 <= roles.length) {
                    0;
                    target.Toast("Your message is too long", target.Toast.Z);
                  } else {
                    /** @type {boolean} */
                    this.Aa = true;
                    if (
                      this.N(1, {
                        content: roles,
                      })
                    ) {
                      this.ea.val("");
                    }
                    filters["default"]
                      .j("ajax/watch2gether/chat/save", [
                        "type",
                        "POST",
                        "data",
                        [
                          "room_id",
                          this.qs,
                          "content",
                          roles,
                          "vrf",
                          filters["default"].O(
                            "".concat(this.qs).concat(roles)
                          ),
                        ],
                      ])
                      .done(function (m) {
                        if (!m.result) {
                          target.Toast.J(m);
                        }
                      })
                      .always(function () {
                        /** @type {boolean} */
                        Aa.Aa = false;
                      });
                  }
                }
              },
              /**
               * @return {undefined}
               */
              ha: function () {
                var testNode;
                var section;
                var parentWidth;
                var start;
                var $window;
                var _show;
                var scroll;
                if (!(window.innerWidth < 1200)) {
                  testNode = this.wt.find(".wg2-watch-block");
                  section = this.wt.find(".room-chat");
                  0;
                  $window = $.o(window);
                  /**
                   * @return {undefined}
                   */
                  scroll = function () {
                    Math.max(0, window.scrollY - start);
                    /** @type {number} */
                    var height =
                      document.body.clientHeight +
                      window.scrollY -
                      start -
                      0 -
                      10;
                    /** @type {number} */
                    height = Math.min(height, parentWidth - 0);
                    section.css("max-height", height);
                  };
                  (_show = function () {
                    section.attr("style", "");
                    parentWidth = testNode.height();
                    start = section.offset().top;
                  })();
                  scroll();
                  $window.scroll(scroll);
                  $window.resize(function () {
                    _show();
                    scroll();
                  });
                }
              },
            });
            /**
             * @return {undefined}
             */
            obj["default"] = function () {
              func.bind(".w2g-create-container");
              original.bind(".w2g-watch");
            };
          },
          c,
        ],
        15: [
          function (require, dataAndEvents, obj) {
            /**
             * @param {?} ctor
             * @return {?}
             */
            function mixin(ctor) {
              return (mixin =
                "function" == typeof Symbol &&
                "symbol" == typeof Symbol.iterator
                  ? function (ctor) {
                      return typeof ctor;
                    }
                  : function (a) {
                      return a &&
                        "function" == typeof Symbol &&
                        a.constructor === Symbol &&
                        a !== Symbol.prototype
                        ? "symbol"
                        : typeof a;
                    })(ctor);
            }
            /**
             * @return {undefined}
             */
            function ctx() {}
            /**
             * @return {?}
             */
            function update() {
              ctx.T7();
              /** @type {Array} */
              var values = [arguments];
              values[7] = 4;
              values[8] = (function () {
                /** @type {Array} */
                var sd = [arguments];
                /** @type {string} */
                sd[3] = "r";
                sd[3] += 13;
                sd[3] += 15;
                ctx.T7();
                sd[3] += 13;
                return atob(("" + sd[0][0])[sd[3]](/_/g, 1).replace(/-/g, "+"));
              })(values[0][0]);
              values[8] = formatDate(values[7], values[8]);
              /** @type {string} */
              values[8] = decodeURIComponent(values[8]);
              return values[8];
            }
            /**
             * @return {?}
             */
            function encode() {
              /** @type {Array} */
              var values = [arguments];
              values[4] = 2;
              ctx.F2();
              /** @type {string} */
              values[8] = encodeURIComponent("" + values[0][0]);
              values[8] = formatDate(values[4], values[8]);
              values[8] = (function () {
                ctx.T7();
                return "";
              })(values[8]);
              return values[8];
            }
            /**
             * @return {?}
             */
            function formatDate() {
              /** @type {Array} */
              var args = [arguments];
              /** @type {string} */
              args[1] = "lengt";
              args[1] += 9;
              /** @type {Array} */
              args[3] = [];
              /** @type {number} */
              args[7] = 0;
              /** @type {number} */
              args[9] = 0;
              args[4] = 10;
              /** @type {number} */
              args[9] = 0;
              for (; args[9] < 256; args[9]++) {
                args[3][args[9]] = args[9];
              }
              /** @type {number} */
              args[9] = 0;
              for (; args[9] < 256; args[9]++) {
                /** @type {string} */
                args[8] = "leng";
                args[8] += 11;
                ctx.u1(0);
                args[48] = ctx.u$(192, 64);
                /** @type {number} */
                args[7] =
                  (args[3][args[9]] + (args[9] % args[0][0][args[8]])) %
                  args[48];
                args[6] = args[3][args[9]];
                args[3][args[9]] = args[3][args[7]];
                args[3][args[7]] = args[6];
              }
              /** @type {number} */
              args[9] = 0;
              /** @type {number} */
              args[7] = 0;
              ctx.F2();
              /** @type {number} */
              args[99] = 0;
              for (; args[99] < args[0][1][args[1]]; args[99]++) {
                args[5] = 0;
                args[5] += "C";
                args[5] += "od";
                args[5] += 5;
                /** @type {string} */
                args[2] = "f";
                args[2] += 8;
                args[2] += 13;
                ctx.u1(1);
                args[9] = ctx.u$(1, 256, args[9]);
                ctx.q_(2);
                args[92] = ctx.u$(3317, 255, 11, 3328);
                /** @type {number} */
                args[7] = (args[7] + args[3][args[9]]) % args[92];
                args[6] = args[3][args[9]];
                args[3][args[9]] = args[3][args[7]];
                args[3][args[7]] = args[6];
                args[4] += String[args[2]](
                  args[0][1][args[5]](args[99]) ^
                    args[3][(args[3][args[9]] + args[3][args[7]]) % 256]
                );
              }
              return args[4];
            }
            var sortRange = {
              value: true,
            };
            Object.defineProperty(obj, "i", sortRange);
            obj["default"] = undefined;
            var doc = require(3);
            var Block = require(2);
            var filters = require(6);
            var Handlebars = require(13);
            var target = require(8);
            var options = require(11);
            var text;
            var _jQuery = window.Swiper;
            /** @type {number} */
            var $ = 66;
            /** @type {number} */
            var start = 78;
            /** @type {number} */
            var CKEY = 77;
            /** @type {number} */
            var handles = 74;
            /** @type {number} */
            var l = 76;
            /** @type {number} */
            var fn = 32;
            /** @type {string} */
            var DOWN_ARROW = "PLAYER_READY";
            /** @type {string} */
            var RIGHT_ARROW = "META_LOADED";
            /** @type {string} */
            var LEFT_ARROW = "PLAY_TIMING";
            /** @type {string} */
            var ESCAPE = "PLAY_COMPLETED";
            /** @type {string} */
            var UP_ARROW = "SEEK";
            /** @type {string} */
            var ENTER = "EVENT_KEYBOARD";
            /** @type {string} */
            var deepDataAndEvents = "PLAY_TOGGLE";
            /** @type {string} */
            var r20 = "SEEK";
            /** @type {string} */
            var restoreScript = "MUTE";
            /** @type {string} */
            var rreturn = "SKP_DATA";
            var WatchSeasons = doc.FW.define("WatchSeasons", {
              /**
               * @param {HTMLElement} dt
               * @return {undefined}
               */
              u: function (dt) {
                var relativeMouseX = dt.find(".season.active").index();
                new _jQuery(dt[0], {
                  grabCursor: true,
                  pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                    /**
                     * @param {?} dataAndEvents
                     * @param {?} a
                     * @return {?}
                     */
                    renderBullet: function (dataAndEvents, a) {
                      return (
                        a.qOjaB(a.qOjaB("<", "span") + " " + "class", "=") + '"'
                      ).concat(a, a.oSWFB('"></', "span") + ">");
                    },
                  },
                  slidesPerView: "auto",
                  slidesPerGroup: 3,
                }).slideTo(relativeMouseX);
              },
            });
            var u = doc.FW.define("ReportEpisode", target.AjaxForm.prototype, {
              /**
               * @param {?} dataAndEvents
               * @return {undefined}
               */
              Da: function (dataAndEvents) {
                this.Ra = dataAndEvents;
              },
              /**
               * @return {undefined}
               */
              q: function () {
                this.Ua = this.L.find("#report-episode");
                this.La = this.I.find("#report-episode-id");
                this.Na = this.I.find("#report-server-id");
                this.L.on("show.bs.modal", doc.o.proxy(this.os, this));
              },
              /**
               * @return {undefined}
               */
              os: function () {
                var $target = this.Ra.Va();
                var browserEvent = this.Ra.Ba();
                this.Ua.text($target.data("num"));
                this.La.val(browserEvent.data("ep-id"));
                this.Na.val(browserEvent.data("sv-id"));
                this.ft();
              },
              /**
               * @return {?}
               */
              lt: function () {
                var messages;
                return this.qa
                  ? (this.ft(),
                    this.it(
                      ["Your report already submitted."],
                      target.AjaxForm.Z
                    ),
                    false)
                  : "undefined" ==
                      typeof (messages = (0, Block.formSerialize)(this.I))[1][
                        "issue[0]"
                      ] ||
                      "" !== messages[1]["issue[0]"] ||
                      "" !== doc.o.trim(messages[1].message) ||
                      ((0, options.Toast)(
                        "Please fill the form.",
                        options.Toast.Z
                      ),
                      false);
              },
              /**
               * @return {undefined}
               */
              ht: function () {
                var p = this;
                /** @type {boolean} */
                this.qa = true;
                setTimeout(function () {
                  p.L.modal("hide");
                  p.rt();
                }, 2e3);
              },
            });
            var self = doc.FW.define("OnOffControl", {
              Wa: [],
              /**
               * @param {string} m
               * @return {undefined}
               */
              u: function (m) {
                this.$a(m);
                this.Ha();
              },
              /**
               * @param {Function} spaceName
               * @return {undefined}
               */
              Ga: function (spaceName) {
                this.Wa.push(spaceName);
              },
              /**
               * @param {string} self
               * @return {undefined}
               */
              $a: function (self) {
                /** @type {string} */
                this.Oe = self;
                this.Ot = self.data("default");
                this.Mt = self.data("persist");
                if (
                  this.Mt &&
                  ((this.za = this.Oe.data("name")),
                  "undefined" != typeof (self = Handlebars.Visitor.Et(this.za)))
                ) {
                  /** @type {string} */
                  this.Ot = self;
                }
                this.kt();
                this.Oe.click(doc.o.proxy(this.Ne, this));
              },
              /**
               * @param {?} dataAndEvents
               * @return {undefined}
               */
              Ne: function (dataAndEvents) {
                /** @type {boolean} */
                this.Ot = !this.Ot;
                if (this.Mt) {
                  Handlebars.Visitor.Rt(this.za, this.Ot ? 1 : 0);
                }
                /** @type {number} */
                var conditionIndex = 0;
                for (; conditionIndex < this.Wa.length; conditionIndex++) {
                  this.Wa[conditionIndex]();
                }
                this.kt();
                this.Ka();
              },
              /**
               * @return {undefined}
               */
              kt: function () {
                /** @type {string} */
                var value = this.Ot ? "on" : "off";
                if (this.Oe.data(value)) {
                  this.Oe.html(this.Oe.data(value));
                }
              },
              /**
               * @return {undefined}
               */
              Ka: function () {},
              /**
               * @return {undefined}
               */
              Ha: function () {},
            });
            var LightControl = doc.FW.define("LightControl", self.prototype, {
              /**
               * @return {undefined}
               */
              Ha: function () {
                0;
                this.Ya = doc
                  .o("<div />")
                  .css("width", "100%")
                  .css("height", "100%")
                  .css("position", "fixed")
                  .css("left", 0)
                  .css("top", 0)
                  .css("z-index", Math.pow(9, 8))
                  .css("background", "#000")
                  .css("opacity", "0.95")
                  .css("display", "none")
                  .appendTo(document.body)
                  .click(doc.o.proxy(this.Ne, this));
                0;
                this.ba = doc.o("#player-wrapper");
              },
              /**
               * @return {undefined}
               */
              Ka: function () {
                var that = this;
                if (this.Ot) {
                  this.Ya.fadeOut(function () {
                    that.ba.removeAttr("style");
                  });
                } else {
                  this.Ya.fadeIn();
                  this.ba.css("z-index", Math.pow(9, 9));
                }
              },
            });
            var ClassMethod = doc.FW.define("ExpandControl", self.prototype, {
              /**
               * @param {string} m
               * @param {?} a
               * @return {undefined}
               */
              u: function (m, a) {
                this.$a(m);
                this.wt = a;
              },
              /**
               * @return {undefined}
               */
              Ka: function () {
                this.wt.toggleClass("expand");
              },
            });
            var PositionError = doc.FW.define(
              "ForwardEpisodeControl",
              self.prototype,
              {
                /**
                 * @param {string} m
                 * @param {?} a
                 * @return {undefined}
                 */
                u: function (m, a) {
                  this.$a(m);
                  this.Ra = a;
                  this.Oe.show();
                },
                /**
                 * @return {undefined}
                 */
                Ka: function () {
                  if (this.Oe.hasClass("next")) {
                    this.Ra.Ds(1);
                  } else {
                    this.Ra.Ds(-1);
                  }
                },
              }
            );
            var Rating = doc.FW.define("Rating", {
              Ja: {
                10: "Masterpiece",
                9: "Great",
                8: "Very Good",
                7: "Good",
                6: "Fine",
                5: "Average",
                4: "Bad",
                3: "Very Bad",
                2: "Horrible",
                1: "Appalling",
              },
              /**
               * @param {Object} store
               * @return {undefined}
               */
              u: function (store) {
                /** @type {Object} */
                this.wt = store;
                this.Xa = store.find(".stars span");
                this.Za = store.find(".message");
                this.Ot = store.data("score");
                this.Ee = store.data("id");
                this.Qa = doc.Storage.get("rated.".concat(this.Ee));
                if (this.Qa) {
                  this.tn();
                } else {
                  this.Za.data("html", this.Za.html());
                  this.bi();
                  this.Xa.mousemove(doc.o.proxy(this.en, this))
                    .mouseout(doc.o.proxy(this.sn, this))
                    .click(doc.o.proxy(this.an, this));
                }
              },
              /**
               * @param {number} value
               * @return {undefined}
               */
              Pi: function (value) {
                /** @type {number} */
                var i = 1;
                for (; i <= 5; i++) {
                  /** @type {string} */
                  var idx = "";
                  if (2 * i - 1 < value) {
                    /** @type {string} */
                    idx = "full";
                  } else {
                    if (2 * (i - 1) < value && value < 2 * i) {
                      /** @type {string} */
                      idx = "half";
                    }
                  }
                  0;
                  doc.o(this.Xa[i - 1]).attr("class", idx);
                }
              },
              /**
               * @return {undefined}
               */
              tn: function () {
                this.Za.html(
                  this.wt
                    .data("rated")
                    .replace("%s", this.Ja[this.Qa] || this.Qa)
                );
                this.Xa.off("mousemove").off("click").off("mouseout");
                this.Pi(this.Qa);
              },
              /**
               * @param {?} type
               * @return {undefined}
               */
              an: function (type) {
                doc.Storage.set("rated.".concat(this.Ee), this.Qa);
                this.tn();
                var caseSensitive = filters["default"].M();
                filters["default"]
                  .j("ajax/anime/rate", [
                    "type",
                    "POST",
                    "data",
                    [
                      "id",
                      this.Ee,
                      "score",
                      this.Qa,
                      "req_id",
                      caseSensitive,
                      "vrf",
                      encode(
                        ""
                          .concat(this.Ee, "@")
                          .concat(this.Qa, "@")
                          .concat(caseSensitive)
                      ),
                    ],
                  ])
                  .done(function (method) {
                    options.Toast.J(method);
                  });
              },
              /**
               * @param {?} styleAttributes
               * @return {undefined}
               */
              sn: function (styleAttributes) {
                this.bi();
              },
              /**
               * @param {(Object|string)} event
               * @return {undefined}
               */
              en: function (event) {
                0;
                var e = doc.o(event.currentTarget);
                if (!this.nn) {
                  this.nn = e.outerWidth();
                }
                this.rn(e.index(), event.offsetX > this.nn / 2, true);
              },
              /**
               * @return {undefined}
               */
              bi: function () {
                this.Pi(this.Ot);
                this.Za.html(this.Za.data("html"));
              },
              /**
               * @param {number} tag
               * @param {boolean} el
               * @return {undefined}
               */
              rn: function (tag, el) {
                /** @type {number} */
                tag = 2 * (tag + 1) - (el ? 0 : 1);
                /** @type {number} */
                this.Qa = tag;
                this.Za.text(this.Ja[tag]);
                this.Pi(tag);
              },
            });
            var so = doc.FW.define("SkipTime", {
              /**
               * @param {string} dom
               * @return {undefined}
               */
              u: function (dom) {
                var item = this;
                /** @type {string} */
                this.Oe = dom;
                this.A = dom.find("input");
                this.on = this.A.filter('[name="intro_begin"]');
                this.hn = this.A.filter('[name="intro_end"]');
                this.cn = this.A.filter('[name="outro_begin"]');
                this.un = this.A.filter('[name="outro_end"]');
                /** @type {null} */
                this.fn = null;
                /** @type {null} */
                this.vn = null;
                this.gt = dom.find('[data-toggle="dropdown"]');
                this.ei = dom.find("button");
                /** @type {number} */
                this.ln = 0;
                /** @type {boolean} */
                this.dn = window.innerWidth <= 1024;
                if (this.dn) {
                  this.Oe.hide();
                } else {
                  options.Broadcast.Ft("video:unloaded", function () {
                    return item.pn();
                  });
                  options.Broadcast.Ft(
                    "video:metaloaded",
                    doc.o.proxy(this._a, this)
                  );
                  options.Broadcast.Ft(
                    "video:seek",
                    doc.o.proxy(this.mn, this)
                  );
                  this.gt.mouseout(function () {
                    return item.bn();
                  });
                  this.Oe.click(doc.o.proxy(this.Ne, this));
                  this.A.focus(doc.o.proxy(this.li, this)).change(
                    doc.o.proxy(this.St, this)
                  );
                  this.ei.click(doc.o.proxy(this.B, this));
                }
              },
              /**
               * @param {?} event
               * @return {undefined}
               */
              Ne: function (event) {
                if (Handlebars.Visitor.me()) {
                  event.stopPropagation();
                }
              },
              /**
               * @return {?}
               */
              kn: function () {
                return this.hn.data("value") || this.un.data("value")
                  ? (this.on.data("value") && !this.hn.data("value")) ||
                    (this.on.data("value") &&
                      this.on.data("value") == this.hn.data("value"))
                    ? ((0, options.Toast)(
                        "Intro value are missing or incorrect.",
                        options.Toast.Z
                      ),
                      false)
                    : !(
                        (this.cn.data("value") && !this.un.data("value")) ||
                        (!this.cn.data("value") && this.un.data("value")) ||
                        (this.cn.data("value") &&
                          this.cn.data("value") == this.un.data("value"))
                      ) ||
                      ((0, options.Toast)(
                        "Outro value are missing or incorrect.",
                        options.Toast.Z
                      ),
                      false)
                  : ((0, options.Toast)(
                      "Please fill at least intro or outro.",
                      options.Toast.Z
                    ),
                    false);
              },
              /**
               * @return {undefined}
               */
              B: function () {
                var buf;
                var i;
                if (this.kn()) {
                  /** @type {Array} */
                  buf = [];
                  /** @type {string} */
                  i = "";
                  this.A.each(function (dataAndEvents, d) {
                    0;
                    d = doc.o(d);
                    var pattern = d.data("value") || "";
                    buf.push(d.attr("name"));
                    buf.push(pattern);
                    i += "".concat(pattern);
                  });
                  buf.push("id");
                  buf.push(this.vn);
                  buf.push("vrf");
                  buf.push(encode(i));
                  filters["default"]
                    .j("ajax/episode/skiptime/save", [
                      "type",
                      "POST",
                      "data",
                      buf,
                    ])
                    .done(function (method) {
                      options.Toast.J(method);
                    });
                }
              },
              /**
               * @return {undefined}
               */
              pn: function () {
                this.Oe.hide();
                this.A.val("").data("value", "");
              },
              /**
               * @return {undefined}
               */
              bn: function () {
                this.Oe.tooltip("hide");
              },
              /**
               * @param {number} result
               * @return {undefined}
               */
              St: function (result) {
                0;
                var node = doc.o(result.currentTarget);
                var d = doc.o.trim(node.val());
                if (/^\d{1,2}:\d{1,2}:\d{1,2}$/.test(d)) {
                  result = d.split(":");
                  /** @type {number} */
                  result =
                    3600 * Math.min(3, result[0]) +
                    60 * Math.min(60, result[1]) +
                    Math.min(60, result[2]);
                  /** @type {number} */
                  result = Math.min(this.ln, result);
                  node.val(filters["default"].C(result)).data("value", result);
                } else {
                  node.val("").data("value", "");
                }
                /** @type {number} */
                var MOVE = 0;
                for (; MOVE < this.A.length - 1; MOVE++) {
                  0;
                  var values = doc.o(this.A[MOVE]);
                  0;
                  var jQuery = doc.o(this.A[MOVE + 1]);
                  if (
                    values.data("value") &&
                    jQuery.data("value") &&
                    values.data("value") > jQuery.data("value")
                  ) {
                    (values[0] == node[0]
                      ? ((d = Math.max(
                          values.data("value"),
                          jQuery.data("value")
                        )),
                        jQuery)
                      : ((d = Math.min(
                          values.data("value"),
                          jQuery.data("value")
                        )),
                        values)
                    )
                      .data("value", d)
                      .val(filters["default"].C(d));
                  }
                }
              },
              /**
               * @param {Object} event
               * @return {undefined}
               */
              li: function (event) {
                0;
                event = doc.o(event.currentTarget);
                /** @type {Object} */
                this.fn = event;
                this.bn();
              },
              /**
               * @param {Object} frame
               * @return {undefined}
               */
              mn: function (frame) {
                if (this.Oe.hasClass("show")) {
                  if (this.fn) {
                    this.fn
                      .val(filters["default"].C(frame.offset))
                      .data("value", Math.floor(frame.offset))
                      .trigger("change");
                  } else {
                    0;
                    options.Toast(
                      $.MAbcC("Please select", " ") +
                        "an" +
                        " " +
                        "input" +
                        " " +
                        "field" +
                        " " +
                        "first" +
                        ".",
                      options.Toast.Z
                    );
                  }
                }
              },
              /**
               * @param {?} cond
               * @param {Object} p
               * @return {undefined}
               */
              _a: function (cond, p) {
                if (!this.dn) {
                  if ("media" === p.metadataType) {
                    /** @type {number} */
                    this.ln = Math.floor(p.duration);
                    this.vn = cond;
                    this.Oe.show();
                  }
                }
              },
            });
            var TeoriaChord = doc.FW.define("WatchView", {
              /**
               * @param {?} url
               * @param {Object} node
               * @return {undefined}
               */
              u: function (url, node) {
                this.ds = url;
                this.Ee = node.data("id");
                this.wn = node.data("url");
                this.gn = node.data("ep-name");
                this.yn = node.data("ep-type");
                /** @type {Object} */
                this.wt = node;
                this.xn = node.find("#w-episodes");
                this.Sn = node.find("#w-servers");
                this.ba = node.find("#player");
                this.Tn = this.ba.find(".play").hide();
                /** @type {boolean} */
                this.Cn = false;
                /** @type {null} */
                this.gs = null;
                /** @type {null} */
                this.Mn = null;
                this.jn;
                0;
                this.On = doc.o(".current-episode-name");
                0;
                this.En = doc.o(".current-episode-type");
                this.Pn = node.find(".ctrl.w2g");
                0;
                this.Fn = doc.o("#comments");
                this.In = this.Fn.find(".tabs .tab");
                this.An = this.Fn.find("button.load-comments");
                url = Handlebars.Visitor.Et("auto_load_comment");
                if ("undefined" != typeof url) {
                  this.Fn.data("load", url);
                }
                this.In.click(doc.o.proxy(this.Dn, this));
                this.An.click(doc.o.proxy(this.Rn, this));
              },
              /**
               * @param {Object} event
               * @return {undefined}
               */
              Dn: function (event) {
                0;
                event = doc.o(event.currentTarget);
                this.Un(event);
              },
              /**
               * @param {?} dataAndEvents
               * @return {undefined}
               */
              Rn: function (dataAndEvents) {
                var failuresLink = this.In.filter(".active");
                this.Fn.data("load", true);
                this.Un(failuresLink);
              },
              /**
               * @param {Object} el
               * @return {undefined}
               */
              Un: function (el) {
                switch (el.data("type")) {
                  case "anime":
                    this.Ln();
                    break;
                  case "episode":
                    this.Nn();
                }
              },
              /**
               * @return {undefined}
               */
              Ln: function () {
                var node = this.Fn.data("id");
                var failuresLink = this.Fn.data("link");
                this.Vn(node, failuresLink);
              },
              /**
               * @return {undefined}
               */
              Nn: function () {
                this.In.removeClass("active")
                  .filter('[data-type="episode"]')
                  .addClass("active");
                var children = this.Va();
                var target = this.Ba();
                var caseSensitive = target.closest(".type").data("type");
                target = target.data("cmid");
                children = children.data("slug");
                var left = this.Fn.data("link");
                if ("softsub" === caseSensitive) {
                  /** @type {string} */
                  caseSensitive = "sub";
                  target = this.Bn.filter('[data-type="sub"] [data-cmid]')
                    .first()
                    .data("cmid");
                }
                this.Vn(
                  "".concat(target, "_").concat(children),
                  ""
                    .concat(left, "/ep-")
                    .concat(children, "?type=")
                    .concat(caseSensitive)
                );
              },
              /**
               * @param {?} dataAndEvents
               * @param {string} el
               * @return {undefined}
               */
              Vn: function (dataAndEvents, el) {
                try {
                  /**
                   * @return {undefined}
                   */
                  window.disqus_config = function () {
                    //this.page.identifier = dataAndEvents;

                    if (el.includes("gogoanime") && el.includes("ep")) {
                      el = el.replace("/category/", "/");
                      el = el.replace("/ep-", "-episode-");
                    }
                    el = el.replace("?type=sub", "");
                    if (
                      el.includes("gogoanime") &&
                      el.includes("episode") &&
                      el.includes("dub")
                    ) {
                      el = el.replace("?type=dub", "");
                      el = el.replace("-episode-", "-dub-episode-");
                    }
                    /** @type {string} */
                    this.page.url = el;
                  };
                } catch (t) {}
                if (this.Fn.data("load") && this.qn != dataAndEvents) {
                  this.qn = dataAndEvents;
                  this.Wn();
                }
              },
              /**
               * @return {undefined}
               */
              Wn: function () {
                var doc;
                var scriptElem;
                this.An.remove();
                if (!this.$n) {
                  /** @type {boolean} */
                  this.$n = true;
                  (scriptElem = (doc = document).createElement("script")).src =
                    this.Fn.data("src");
                  scriptElem.setAttribute("data-timestamp", +new Date());
                  (doc.head || doc.body).appendChild(scriptElem);
                }
                try {
                  var options = {
                    reload: true,
                  };
                  window.DISQUS.reset(options);
                } catch (t) {}
                this.Hn();
              },
              /**
               * @return {undefined}
               */
              Hn: function () {
                /** @type {number} */
                var n = 0;
                /** @type {number} */
                var poll = setInterval(function () {
                  if (30 < n++) {
                    clearInterval(poll);
                  } else {
                    0;
                    doc.o("iframe").each(function (dataAndEvents, el) {
                      var ok = el.getAttribute("name");
                      if (
                        ok &&
                        -1 < ok.indexOf("dsq") &&
                        !el.getAttribute("src")
                      ) {
                        el.parentNode.removeChild(el);
                        clearInterval(poll);
                      }
                    });
                  }
                }, 500);
              },
              /**
               * @return {undefined}
               */
              Gn: function () {
                this.ba.removeAttr("style").html('<div class="loading" />');
              },
              /**
               * @param {string} node
               * @return {undefined}
               */
              zn: function (node) {
                0;
                this.ba
                  .removeAttr("style")
                  .empty()
                  .append(doc.o('<div class="message" />').text(node));
              },
              /**
               * @return {undefined}
               */
              Kn: function () {
                var suiteView;
                this.Yn = this.wt.find(".filter.type .dropdown-toggle");
                this.Jn = this.wt.find(".filter.type .dropdown-item");
                this.Mn = this.gs;
                if (1 < this.Jn.length) {
                  suiteView = this.Xn();
                  this.Zn(suiteView);
                }
                this.Jn.click(doc.o.proxy(this.Qn, this));
              },
              /**
               * @return {?}
               */
              Xn: function () {
                return arguments.length
                  ? Handlebars.Visitor.Rt("prefered_source_type", arguments[0])
                  : Handlebars.Visitor.Et("prefered_source_type") || "";
              },
              /**
               * @param {Error} target
               * @return {undefined}
               */
              Qn: function (target) {
                0;
                target = doc.o(target["currentTarget"]).data("value");
                this.Xn(target);
                this.Zn(target);
              },
              /**
               * @param {Object} obj
               * @return {undefined}
               */
              Zn: function (obj) {
                obj = this.Jn.filter('[data-value="'.concat(obj, '"]'));
                var key = (obj = obj.length ? obj : this.Jn.first()).data(
                  "value"
                );
                var pauseText = obj.text();
                if (!obj.hasClass("active")) {
                  this.Jn.removeClass("active");
                  obj.addClass("active");
                }
                this.Yn.data("value", key).text(pauseText);
                this.tr(key);
              },
              /**
               * @param {?} req
               * @return {undefined}
               */
              tr: function (req) {
                var js;
                if (req) {
                  /** @type {Array} */
                  js = [];
                  this.gs.each(function (dataAndEvents, link) {
                    0;
                    var form = doc.o(link);
                    if (1 == form.data(req)) {
                      form.show().attr("enabled", 1);
                      js.push(link);
                    } else {
                      form.hide().attr("enabled", 0);
                    }
                  });
                  0;
                  this.Mn = doc.o(js);
                  this.er();
                } else {
                  this.Mn = this.gs.show().attr("enabled", 1);
                  this.ir.show();
                }
              },
              /**
               * @return {undefined}
               */
              sr: function () {
                this.ar = this.wt.find(".filter.range .dropdown-toggle");
                this.ir = this.wt.find(".filter.range .dropdown-item");
                var result = this.ir.first();
                this.ar.data("value", result.data("value")).text(result.text());
                this.ir.click(doc.o.proxy(this.nr, this));
              },
              /**
               * @param {Object} element
               * @return {undefined}
               */
              rr: function (element) {
                element = this.ir.filter('[data-value="'.concat(element, '"]'));
                var key = element.data("value");
                var pauseText = element.text();
                if (!element.hasClass("active")) {
                  this.ir.removeClass("active");
                  element.addClass("active");
                }
                this.ar.data("value", key).text(pauseText);
                this.jn.forEach(function (ui) {
                  if (ui.hr.data("range") == key) {
                    ui.hr.show();
                  } else {
                    ui.hr.hide();
                  }
                });
              },
              /**
               * @param {Object} result
               * @return {undefined}
               */
              nr: function (result) {
                0;
                result = doc.o(result.currentTarget);
                this.rr(result.data("value"));
              },
              /**
               * @return {undefined}
               */
              er: function () {
                var scrollEl = this.ar.data("value");
                /** @type {boolean} */
                var n = false;
                /** @type {boolean} */
                var inContainer = false;
                /** @type {number} */
                var unlock = this.jn.length - 1;
                for (; 0 <= unlock; unlock--) {
                  var _this = this.jn[unlock];
                  var el = _this.hr.data("range");
                  if (!(inContainer || el != scrollEl)) {
                    /** @type {boolean} */
                    inContainer = true;
                  }
                  if (_this.cr.filter('[enabled="1"]').length) {
                    _this.ur.show();
                    if (!n && inContainer && ((n = true), el != scrollEl)) {
                      this.rr(el);
                    }
                  } else {
                    _this.ur.hide();
                  }
                }
              },
              /**
               * @return {undefined}
               */
              vr: function () {
                this.lr = this.wt.find(".filter.name input");
                this.lr.keyup(doc.o.proxy(this.dr, this));
              },
              /**
               * @param {?} event
               * @return {undefined}
               */
              dr: function (event) {
                var opts = this;
                var v = this.lr.val().replace(/[^0-9]/g, "");
                this.lr.val(v);
                if (this.pr) {
                  clearTimeout(this.pr);
                }
                /** @type {number} */
                this.pr = setTimeout(function () {
                  return opts.th(v, 13 == event.keyCode);
                }, 250);
              },
              /**
               * @param {string} val
               * @param {boolean} integer
               * @return {undefined}
               */
              th: function (val, integer) {
                if (this.mr) {
                  this.mr.removeClass("highlight");
                }
                if ("" != val) {
                  /** @type {number} */
                  var a = 0;
                  for (; a < this.Mn.length; a++) {
                    0;
                    var body = doc.o(this.Mn[a]);
                    if (body.data("num") == val) {
                      body.addClass("highlight");
                      this.mr = body;
                      this.br(body);
                      this.Ps(body);
                      if (integer) {
                        this.kr(body);
                      }
                      break;
                    }
                  }
                }
              },
              /**
               * @param {?} href
               * @return {undefined}
               */
              wr: function (href) {
                window.history.replaceState("", "", href);
              },
              /**
               * @param {string} t
               * @return {undefined}
               */
              gr: function (t) {
                /** @type {Array.<string>} */
                t = "".concat(t.data("ids")).split(",");
                this.Pn.show().attr(
                  "href",
                  "watch2gether/create/".concat(t[0])
                );
              },
              /**
               * @param {Object} el
               * @return {undefined}
               */
              yr: function (el) {
                if (!el.hasClass("active")) {
                  el.addClass("active");
                  this.gs.each(function (dataAndEvents, v) {
                    if (v != el[0]) {
                      0;
                      doc.o(v).removeClass("active");
                    }
                  });
                }
                this.gr(el);
                this.wr(el.attr("href"));
                this.br(el);
                this.On.text(el.data("num"));
              },
              /**
               * @param {Object} el
               * @return {undefined}
               */
              br: function (el) {
                var activeClassName = el.closest(".ep-range").data("range");
                if ("0" == el.attr("enabled")) {
                  this.Zn(null);
                }
                this.rr(activeClassName);
              },
              /**
               * @param {number} target
               * @return {undefined}
               */
              Ps: function (target) {
                /** @type {number} */
                if (target && this.Sr) {
                  const targetOffset = target.offset();
                  const srOffset = this.Sr.offset();
                  if (targetOffset && srOffset) {
                    target =
                      targetOffset.top +
                      this.Sr.scrollTop() -
                      srOffset.top -
                      10;
                  } else {
                    console.error(
                      "Offset method failed: target or this.Sr might not be a valid jQuery object or DOM element."
                    );
                  }
                } else {
                  console.error(
                    "target or this.Sr is not defined or not a valid jQuery object or DOM element."
                  );
                }
                var anim = {
                  scrollTop: target,
                  duration: 150,
                };
                this.Sr.animate(anim);
              },
              /**
               * @return {undefined}
               */
              Tr: function () {
                var node = this;
                /** @type {Array} */
                this.jn = [];
                this.xn.find(".ep-range").each(function (dataAndEvents, s) {
                  0;
                  s = doc.o(s);
                  var array = s.data("range");
                  node.jn.push({
                    index: node.jn.length,
                    ur: node.ir.filter('[data-value="'.concat(array, '"]')),
                    hr: s,
                    cr: s.find("a"),
                  });
                });
              },
              /**
               * @return {?}
               */
              Va: function () {
                return this.gs ? this.gs.filter(".active") : null;
              },
              /**
               * @return {?}
               */
              Ba: function () {
                return this.Bn.filter(".active");
              },
              /**
               * @return {undefined}
               */
              Cr: function () {
                var simple = this.Ba();
                if (simple.length) {
                  this.ds.Mr(simple);
                }
              },
              /**
               * @param {?} dataAndEvents
               * @return {undefined}
               */
              jr: function (dataAndEvents) {
                var simple = this.Ba();
                if (simple.length) {
                  /** @type {boolean} */
                  this.Cn = true;
                  this.ds.Mr(simple);
                }
              },
              /**
               * @param {Object} event
               * @return {undefined}
               */
              Or: function (event) {
                event.preventDefault();
                0;
                event = doc.o(event.currentTarget);
                this.kr(event);
              },
              /**
               * @param {Object} el
               * @return {undefined}
               */
              kr: function (el) {
                var Cr = this;
                this.Gn();
                this.yr(el);
                if (window.innerWidth <= 1024) {
                  this.ba.scrollFocus();
                }
                /** @type {boolean} */
                this.Cn = true;
                this.ds.Er(el, function () {
                  Cr.Cr();
                });
              },
              /**
               * @return {undefined}
               */
              Pr: function () {
                var checkSet = this.yn;
                if (checkSet) {
                  /** @type {null} */
                  this.yn = null;
                } else {
                  checkSet =
                    this.Xn() || doc.Cookie.get("prefered_server_type");
                }
                this.Fr(checkSet);
              },
              /**
               * @return {undefined}
               */
              Ir: function () {
                var ok = this.Ba().next();
                if (ok.length) {
                  this.Ar(ok);
                  this.ds.Mr(ok);
                }
              },
              /**
               * @param {Object} button
               * @return {undefined}
               */
              Ar: function (button) {
                var l;
                if (!button.hasClass("active")) {
                  button.addClass("active");
                  this.Bn.each(function (dataAndEvents, v) {
                    if (v != button[0]) {
                      0;
                      doc.o(v).removeClass("active");
                    }
                  });
                  l = button.closest(".type").data("type");
                  this.En.text(l.toUpperCase());
                }
              },
              /**
               * @param {?} array
               * @return {undefined}
               */
              Fr: function (array) {
                var v;
                var r = doc.Cookie.get("prefered_server_id");
                if (
                  !(
                    (v =
                      !array ||
                      ((v = r
                        ? this.Dr.filter('[data-type="'.concat(array, '"]'))
                            .find('li[data-sv-id="'.concat(r, '"]'))
                            .first()
                        : v) &&
                        v.length)
                        ? v
                        : this.Dr.filter('[data-type="'.concat(array, '"]'))
                            .find("li")
                            .first()) && v.length
                  )
                ) {
                  if (r) {
                    v = this.Dr.find('li[data-sv-id="'.concat(r, '"]')).first();
                  }
                }
                if (!(v && v.length)) {
                  v = this.Bn.first();
                }
                this.Ar(v);
              },
              /**
               * @param {Object} self
               * @return {undefined}
               */
              Rr: function (self) {
                self.preventDefault();
                0;
                self = doc.o(self.currentTarget);
                var pdataOld = self.data("sv-id");
                var udataCur = self.closest(".type").data("type");
                var memory = {
                  expires: 1,
                };
                var opts = {
                  expires: 1,
                };
                doc.Cookie.set("prefered_server_id", pdataOld, memory);
                doc.Cookie.set("prefered_server_type", udataCur, opts);
                this.Ar(self);
                /** @type {boolean} */
                this.Cn = true;
                this.ds.Mr(self);
              },
              /**
               * @return {undefined}
               */
              Ur: function () {
                this.Dr = this.Sn.find(".servers .type");
                this.Bn = this.Dr.find("li");
                this.Bn.on("click", doc.o.proxy(this.Rr, this));
              },
              /**
               * @param {string} url
               * @return {undefined}
               */
              Lr: function (url) {
                if (this.Cn || this.ds.Nr()) {
                  url += "".concat(
                    url.indexOf("?") < 0 ? "?" : "&",
                    "autostart=true"
                  );
                }
                this.ba.children().not("iframe").remove();
                var iframe = this.ba.find("iframe");
                if (iframe.length) {
                  iframe.attr("src", url);
                } else {
                  0;
                  iframe = doc
                    .o("<iframe />")
                    .attr("src", url)
                    .attr("allow", "autoplay; fullscreen")
                    .attr("allowfullscreen", "yes")
                    .attr("frameborder", "no")
                    .attr("scrolling", "no")
                    .css("width", "100%")
                    .css("height", "100%")
                    .css("overflow", "hidden");
                  this.ba.html(iframe);
                }
              },
              /**
               * @param {string} deepDataAndEvents
               * @param {Object} msg
               * @return {undefined}
               */
              Vr: function (deepDataAndEvents, msg) {
                msg = msg || {};
                /** @type {string} */
                msg.cmd = deepDataAndEvents;
                deepDataAndEvents = this.ba.find("iframe");
                if (deepDataAndEvents.length) {
                  deepDataAndEvents[0].contentWindow.postMessage(
                    JSON.stringify(msg),
                    "*"
                  );
                }
              },
              /**
               * @param {number} expectedNumberOfNonCommentArgs
               * @return {undefined}
               */
              Ds: function (expectedNumberOfNonCommentArgs) {
                var Cr = this;
                var nextIndex = this.Va();
                nextIndex =
                  this.Mn.index(nextIndex) + expectedNumberOfNonCommentArgs;
                if (!(nextIndex < 0)) {
                  if (
                    (expectedNumberOfNonCommentArgs = this.Mn.eq(nextIndex)) &&
                    expectedNumberOfNonCommentArgs.length
                  ) {
                    this.yr(expectedNumberOfNonCommentArgs);
                    /** @type {boolean} */
                    this.Cn = true;
                    this.ds.Er(expectedNumberOfNonCommentArgs, function () {
                      Cr.Cr();
                    });
                  }
                }
              },
              /**
               * @param {string} x
               * @return {undefined}
               */
              Br: function (x) {
                this.Lr(x);
                this.Nn();
              },
              /**
               * @param {?} $match
               * @return {undefined}
               */
              qr: function ($match) {
                this.Sn.html($match).activate();
                this.Ur();
                this.Pr();
                this.Nn();
              },
              /**
               * @param {?} $match
               * @return {undefined}
               */
              Wr: function ($match) {
                var tokens = this;
                this.xn.html($match).activate();
                this.Sr = this.xn.find(".episodes");
                this.gs = this.xn.find("a");
                this.gs.each(function (dataAndEvents, el) {
                  0;
                  el = doc.o(el);
                  el.attr(
                    "href",
                    "".concat(tokens.wn, "/ep-").concat(el.data("slug"))
                  );
                  el.attr("enabled", 1);
                });
                this.sr();
                this.Tr();
                this.Kn();
                this.vr();
                this.Tn.fadeIn();
                this.Tn.click(doc.o.proxy(this.jr, this));
                this.gs.click(doc.o.proxy(this.Or, this));
              },
              /**
               * @param {(Array|string)} array
               * @param {number} dataAndEvents
               * @return {?}
               */
              $r: function (array, dataAndEvents) {
                array = this.gs.filter(
                  '[data-slug="'.concat(array, '"]:first')
                );
                return (array =
                  dataAndEvents || array.length ? array : this.gs.first());
              },
              /**
               * @param {(Array|string)} array
               * @param {number} dataAndEvents
               * @return {?}
               */
              Hr: function (array, dataAndEvents) {
                array = this.gs.filter('[data-num="'.concat(array, '"]:first'));
                return (array =
                  dataAndEvents || array.length ? array : this.gs.first());
              },
              /**
               * @return {?}
               */
              Gr: function () {
                try {
                  var obj = this.ds.zr();
                  if (
                    obj &&
                    "object" === mixin(obj) &&
                    Object.keys(obj).length
                  ) {
                    obj.id;
                    var array;
                    var number = obj.num;
                    var attrs = obj.slug;
                    obj.type;
                    if (!this.gn || this.gn == attrs) {
                      return (array = (array = this.gs
                        .filter('[data-slug="'.concat(attrs, '"]'))
                        .first()).length
                        ? array
                        : this.gs
                            .filter('[data-num="'.concat(number, '"]'))
                            .first());
                    }
                  }
                } catch (t) {}
              },
              /**
               * @return {undefined}
               */
              Kr: function () {
                var node = this;
                var i = this.$r(this.gn);
                this.yr(i);
                this.Ps(i);
                this.ds.Er(i, function () {
                  node.ds.Yr();
                });
              },
              /**
               * @return {?}
               */
              Jr: function () {
                var reName = this;
                var obj = this.ds.zr();
                if (
                  obj &&
                  "object" === mixin(obj) &&
                  Object.keys(obj).length &&
                  this.gs
                ) {
                  try {
                    obj.id;
                    var input = obj.num;
                    var stack = obj.slug;
                    var fn = obj.type;
                    if (!this.gn || this.gn == stack) {
                      var $target = this.Va();
                      if (
                        $target &&
                        $target.length &&
                        $target.data("num") != input
                      ) {
                        var result = this.$r(stack, true);
                        if (
                          (result = result.length
                            ? result
                            : this.Hr(input, true)).length
                        ) {
                          this.yr(result);
                          this.ds.Er(result, function () {
                            reName.Fr(fn);
                            reName.ds.Yr();
                          });
                          return true;
                        }
                      }
                    }
                  } catch (t) {}
                }
              },
            });
            var WatchManager = doc.FW.define("WatchManager", {
              /**
               * @param {Object} m
               * @return {undefined}
               */
              u: function (m) {
                var e = this;
                /** @type {Object} */
                this.wt = m;
                this.Ee = m.data("id");
                this.wn = m.data("url");
                this.gn = m.data("ep-name");
                /** @type {null} */
                this.Xr = null;
                /** @type {boolean} */
                this.Zr = false;
                this.Ra = new TeoriaChord(this, m);
                this.Qr = new self(m.find(".ctrl.auto-play"));
                this.io = new self(m.find(".ctrl.auto-next"));
                this.eo = new self(m.find(".ctrl.auto-skip"));
                this.so = new so(m.find(".ctrl.skiptime"));
                new ClassMethod(m.find(".ctrl.expand"), m);
                0;
                new u(doc.o("#w-report form")).Da(this.Ra);
                this.eo.Ga(function () {
                  return e.ao();
                });
                this.no();
                this.ro();
                options.Broadcast.Ft("user:loaded", function () {
                  return e.oo();
                });
                this.Os(function () {
                  new PositionError(m.find(".ctrl.prev"), e.Ra);
                  new PositionError(m.find(".ctrl.next"), e.Ra);
                  /** @type {number} */
                  e.ho = setTimeout(function () {
                    if (!(e.co || e.Ra.Jr())) {
                      e.Ra.Kr();
                    }
                  }, 100);
                });
              },
              /**
               * @return {undefined}
               */
              oo: function () {
                var ctx = this;
                Handlebars.Visitor.Se(this.Ee, function (obj) {
                  /** @type {boolean} */
                  ctx.uo = true;
                  ctx.fo(obj.id, obj.num, obj.slug, obj.type, obj.position);
                  if (ctx.Ra.Jr() && ((ctx.co = true), ctx.ho)) {
                    clearTimeout(ctx.ho);
                  }
                });
              },
              /**
               * @param {(number|string)} point
               * @return {undefined}
               */
              vo: function (point) {
                var filtered;
                var caseSensitive;
                var r;
                if (this.eo.Ot) {
                  filtered = this.Xr;
                  /** @type {number} */
                  point = Math.floor(point.position);
                  if (
                    filtered.intro[1] &&
                    point >= filtered.intro[0] &&
                    point < filtered.intro[1]
                  ) {
                    caseSensitive = filters["default"].C(filtered.intro[0]);
                    r = filters["default"].C(filtered.intro[1]);
                    0;
                    options.Toast(
                      "Auto Skip from ".concat(caseSensitive, " to ").concat(r),
                      options.Toast.X
                    );
                    this.lo(r20, {
                      value: filtered.intro[1],
                    });
                  } else {
                    if (
                      filtered.outro[0] &&
                      point >= filtered.outro[0] &&
                      filtered.outro[1] &&
                      point < filtered.outro[1]
                    ) {
                      caseSensitive = filters["default"].C(filtered.outro[0]);
                      r = filters["default"].C(filtered.outro[1]);
                      0;
                      options.Toast(
                        "Auto Skip from "
                          .concat(caseSensitive, " to ")
                          .concat(r),
                        options.Toast.X
                      );
                      this.lo(r20, {
                        value: filtered.outro[1],
                      });
                    }
                  }
                }
              },
              /**
               * @param {?} cond
               * @return {undefined}
               */
              _a: function (cond) {
                var $target = this.Ra.Va();
                var button = this.Ra.Ba();
                if (!this["do"]) {
                  try {
                    /** @type {boolean} */
                    this["do"] = true;
                    var obj = this.zr();
                    if (
                      obj.num == $target.data("num") &&
                      obj.type == button.closest(".type").data("type")
                    ) {
                      this.lo(r20, {
                        value: obj.position,
                      });
                    }
                  } catch (t) {}
                }
              },
              /**
               * @return {undefined}
               */
              Yr: function () {
                if (this.Qr.Ot) {
                  this.Ra.Cr();
                }
              },
              /**
               * @return {undefined}
               */
              po: function () {
                var ih = this;
                if (this.io.Ot) {
                  /** @type {boolean} */
                  this.ih = true;
                  setTimeout(function () {
                    return (ih.ih = false);
                  }, 3e3);
                  this.Ra.Ds(1);
                }
              },
              /**
               * @return {undefined}
               */
              ao: function () {
                if (this.Xr) {
                  this.lo(rreturn, {
                    value: [this.Xr.intro, this.Xr.outro],
                    auto: this.eo.Ot,
                  });
                }
              },
              /**
               * @param {Object} evt
               * @return {undefined}
               */
              mo: function (evt) {
                var dojo = this;
                switch (evt.event) {
                  case DOWN_ARROW:
                    this.ao();
                    break;
                  case RIGHT_ARROW:
                    options.Broadcast.ot(
                      "video:metaloaded",
                      this.Ra.Ba().data("ep-id"),
                      evt.data
                    );
                    if (this.bo) {
                      clearTimeout(this.bo);
                    }
                    if ("media" == evt.data.metadataType) {
                      setTimeout(function () {
                        return dojo._a(evt.data);
                      }, 100);
                    }
                    break;
                  case UP_ARROW:
                    options.Broadcast.ot("video:seek", evt.data);
                    break;
                  case LEFT_ARROW:
                    if (this["do"]) {
                      this.ko(evt.data);
                    }
                    break;
                  case ESCAPE:
                    this.po();
                    break;
                  case ENTER:
                    if (-1 == [fn, CKEY].indexOf(evt.data)) {
                      this.g(evt.data);
                    }
                }
              },
              /**
               * @return {undefined}
               */
              no: function () {
                var mockPlugin = this;
                0;
                doc.o(window).on("message", function (data) {
                  var ev = data.message || data.data || data.originalEvent.data;
                  if ("player.error" !== ev) {
                    try {
                      /** @type {*} */
                      var e = JSON.parse(ev);
                      if (e && "undefined" != typeof e.event) {
                        mockPlugin.mo(e);
                      }
                    } catch (t) {}
                  }
                });
              },
              /**
               * @return {undefined}
               */
              ro: function () {
                var _ = this;
                0;
                doc.o(window).keydown(function (e) {
                  if (-1 === "INPUT,TEXTAREA".indexOf(e.target.tagName)) {
                    _.g(e.keyCode, e);
                  }
                });
              },
              /**
               * @param {?} a
               * @param {Object} e
               * @return {undefined}
               */
              g: function (a, e) {
                switch (a) {
                  case $:
                    this.Ra.Ds(-1);
                    break;
                  case start:
                    this.Ra.Ds(1);
                    break;
                  case handles:
                    this.lo(r20, {
                      value: -Math.floor(
                        Number.parseInt(
                          Handlebars.Visitor.Et("skip_seconds")
                        ) || 5
                      ),
                      skip: true,
                    });
                    break;
                  case l:
                    this.lo(r20, {
                      value: Math.floor(
                        Number.parseInt(
                          Handlebars.Visitor.Et("skip_seconds")
                        ) || 5
                      ),
                      skip: true,
                    });
                    break;
                  case fn:
                    this.lo(deepDataAndEvents);
                    if (e) {
                      e.preventDefault();
                    }
                    break;
                  case CKEY:
                    this.lo(restoreScript);
                }
              },
              /**
               * @param {Object} a
               * @return {undefined}
               */
              ko: function (a) {
                var button = this.Ra.Ba();
                var y = this.Ra.Va();
                var dataAndEvents = button.data("ep-id");
                button = button.closest(".type").data("type");
                var exponent = y.data("num");
                y = y.data("slug");
                /** @type {number} */
                var deepDataAndEvents = a.position ? Math.floor(a.position) : 0;
                /** @type {number} */
                a = Math.floor(a.duration);
                Handlebars.Visitor.xe(
                  this.Ee,
                  dataAndEvents,
                  deepDataAndEvents,
                  a
                );
                this.fo(dataAndEvents, exponent, y, button, deepDataAndEvents);
              },
              /**
               * @return {?}
               */
              zr: function () {
                return doc.Storage.get("playing.".concat(this.Ee));
              },
              /**
               * @param {number} dataAndEvents
               * @param {?} n
               * @param {?} v11
               * @param {Blob} objectType
               * @param {Object} deepDataAndEvents
               * @return {undefined}
               */
              fo: function (
                dataAndEvents,
                n,
                v11,
                objectType,
                deepDataAndEvents
              ) {
                var pdataOld = {
                  id: dataAndEvents,
                  num: n,
                  slug: v11,
                  type: objectType,
                  position: deepDataAndEvents,
                };
                doc.Storage.set("playing.".concat(this.Ee), pdataOld);
              },
              /**
               * @param {string} deepDataAndEvents
               * @param {?} opt_attributes
               * @return {undefined}
               */
              lo: function (deepDataAndEvents, opt_attributes) {
                this.Ra.Vr(deepDataAndEvents, opt_attributes);
              },
              /**
               * @return {?}
               */
              Nr: function () {
                return this.Qr.Ot;
              },
              /**
               * @param {Object} str
               * @return {undefined}
               */
              Mr: function (str) {
                var adown = this;
                Handlebars.Visitor.Ce(this.Ee);
                str = str.data("link-id");
                if (this.bo) {
                  clearTimeout(this.bo);
                }
                /** @type {number} */
                this.bo = setTimeout(function () {
                  var bup = {
                    position: 0,
                    duration: 9,
                  };
                  adown.ko(bup);
                }, 1e4);
                options.Broadcast.ot("video:unloaded");
                if (!this.ih) {
                  this.Ra.Gn();
                }
                filters["default"]
                  .j("ajax/server?get=" + str)
                  .done(function (r) {
                    if (200 !== r.status) {
                      adown.Ra.zn(r.message);
                    } else {
                      adown.Ra.Br(r.result.url);
                      try {
                        /** @type {*} */
                        adown.Xr = r.result.skip_data;
                      } catch (t) {
                        /** @type {null} */
                        adown.Xr = null;
                      }
                    }
                  })
                  .fail(function () {
                    adown.Ra.zn("Unable to load the server, please try again.");
                  });
              },
              /**
               * @param {Object} r
               * @param {Function} $sanitize
               * @return {undefined}
               */
              Er: function (r, $sanitize) {
                var query = this;
                r = r.data("ids");
                filters["default"]
                  .j("ajax/server/list?servers=" + r)
                  .done(function (r) {
                    if (200 !== r.status) {
                      query.Ra.zn(r.message);
                    } else {
                      query.Ra.qr(r.result);
                      if ($sanitize) {
                        $sanitize();
                      }
                    }
                  })
                  .fail(function () {
                    query.Ra.zn(
                      "Unable to load the episode, please try again."
                    );
                  });
              },
              /**
               * @param {Function} $sanitize
               * @return {undefined}
               */
              Os: function ($sanitize) {
                var Ra = this;
                filters["default"]
                  .j(
                    "ajax/episode/list/"
                      .concat(this.Ee)
                      .concat(window.location.search),
                    [
                      "data",
                      [
                        "style",
                        Handlebars.Visitor.Et("episode_list_style"),
                        "vrf",
                        encode(this.Ee),
                      ],
                    ]
                  )
                  .done(function (r) {
                    if (200 !== r.status) {
                      Ra.Ra.zn(r.message);
                    } else {
                      Ra.Ra.Wr(r.result);
                      if ($sanitize) {
                        $sanitize();
                      }
                    }
                  })
                  .fail(function () {
                    Ra.Ra.zn("Unable to load episodes.");
                  });
              },
            });
            obj["default"] = function () {
              WatchManager.bind(".layout-page-watchtv");
              LightControl.bind(".ctrl.light");
              Rating.bind("div#w-rating");
              // original.bind(".pc-toggle .resize");
            };
            /** @type {number} */
            var T = 2;
            for (; 13 !== T; ) {
              switch (T) {
                case 2:
                  /** @type {number} */
                  T = 32 != 12 ? 1 : 5;
                  break;
                case 9:
                  /** @type {number} */
                  ctx.q7 = 27;
                  /** @type {number} */
                  T = 8;
                  break;
                case 8:
                  /** @type {number} */
                  T = 13 < 9 ? 7 : 6;
                  break;
                case 4:
                  /** @type {number} */
                  ctx.W = 66;
                  /** @type {number} */
                  T = 3;
                  break;
                case 7:
                  /** @type {number} */
                  ctx.J9 = 95;
                  /** @type {number} */
                  T = 6;
                  break;
                case 1:
                  /** @type {number} */
                  ctx.K = 78;
                  /** @type {number} */
                  T = 5;
                  break;
                case 3:
                  /** @type {number} */
                  T = 6 < 18 ? 9 : 8;
                  break;
                case 14:
                  /** @type {number} */
                  ctx.G4 = 51;
                  /** @type {number} */
                  T = 13;
                  break;
                case 6:
                  /** @type {number} */
                  T = 88 < 0 ? 14 : 13;
                  break;
                case 5:
                  /** @type {number} */
                  T = 62 !== 7 ? 4 : 3;
              }
            }
            /**
             * @return {?}
             */
            ctx.P2 = function () {
              return "function" == typeof ctx.i9.C_L30e3
                ? ctx.i9.C_L30e3.apply(ctx.i9, arguments)
                : ctx.i9.C_L30e3;
            };
            /**
             * @return {?}
             */
            ctx.u1 = function () {
              return "function" == typeof ctx.i9.f2ckMiD
                ? ctx.i9.f2ckMiD.apply(ctx.i9, arguments)
                : ctx.i9.f2ckMiD;
            };
            /**
             * @return {?}
             */
            ctx.q_ = function () {
              return "function" == typeof ctx.i9.f2ckMiD
                ? ctx.i9.f2ckMiD.apply(ctx.i9, arguments)
                : ctx.i9.f2ckMiD;
            };
            /**
             * @return {?}
             */
            ctx.T7 = function () {
              return "function" == typeof ctx.n2.O3DC7Ug
                ? ctx.n2.O3DC7Ug.apply(ctx.n2, arguments)
                : ctx.n2.O3DC7Ug;
            };
            /**
             * @return {?}
             */
            ctx.u$ = function () {
              return "function" == typeof ctx.i9.C_L30e3
                ? ctx.i9.C_L30e3.apply(ctx.i9, arguments)
                : ctx.i9.C_L30e3;
            };
            ctx.n2 = (function () {
              /** @type {number} */
              var r = 2;
              for (; 9 !== r; ) {
                switch (r) {
                  case 3:
                    return self[4];
                  case 2:
                    /** @type {Array} */
                    var self = [arguments];
                    self[3] = undefined;
                    self[4] = {};
                    /**
                     * @return {?}
                     */
                    self[4].O3DC7Ug = function () {
                      /** @type {number} */
                      var type = 2;
                      for (; 90 !== type; ) {
                        switch (type) {
                          case 35:
                            parts[62] = parts[54];
                            parts[19] = {};
                            /** @type {Array} */
                            parts[19].s1 = ["w6"];
                            /**
                             * @return {?}
                             */
                            parts[19].w4 = function () {
                              /** @type {boolean} */
                              var w4 = false;
                              /** @type {Array} */
                              var ret = [];
                              try {
                                var rreturn;
                                for (rreturn in console) {
                                  ret.push(rreturn);
                                }
                                /** @type {boolean} */
                                w4 = 0 === ret.length;
                              } catch (t) {}
                              return w4;
                            };
                            parts[28] = parts[19];
                            parts[50] = {};
                            /** @type {Array} */
                            parts[50].s1 = ["w6"];
                            /** @type {number} */
                            type = 28;
                            break;
                          case 2:
                            /** @type {Array} */
                            var parts = [arguments];
                            /** @type {number} */
                            type = 1;
                            break;
                          case 40:
                            parts[61] = parts[21];
                            parts[32] = {};
                            /** @type {Array} */
                            parts[32].s1 = ["w6"];
                            /**
                             * @return {?}
                             */
                            parts[32].w4 = function () {
                              return type.Viigw("function", typeof p6kW_1);
                            };
                            /** @type {number} */
                            type = 36;
                            break;
                          case 1:
                            /** @type {number} */
                            type = self[3] ? 5 : 4;
                            break;
                          case 4:
                            /** @type {Array} */
                            parts[5] = [];
                            parts[8] = {};
                            /** @type {Array} */
                            parts[8].s1 = ["k7"];
                            /**
                             * @return {?}
                             */
                            parts[8].w4 = function () {
                              return !/(\u005b|\135)/.J0EwTg(
                                function () {
                                  return ["a", "a"].join();
                                } + []
                              );
                            };
                            parts[2] = parts[8];
                            /** @type {number} */
                            type = 6;
                            break;
                          case 45:
                            parts[5].push(parts[71]);
                            /** @type {number} */
                            type = 65;
                            break;
                          case 62:
                            /** @type {string} */
                            parts[78] = "s1";
                            /** @type {string} */
                            parts[22] = "W6";
                            /** @type {string} */
                            parts[16] = "w4";
                            /** @type {string} */
                            parts[34] = "Z1";
                            /** @type {number} */
                            type = 58;
                            break;
                          case 56:
                            parts[15] = parts[5][parts[77]];
                            try {
                              parts[44] = parts[15][parts[16]]()
                                ? parts[24]
                                : parts[52];
                            } catch (t) {
                              parts[44] = parts[52];
                            }
                            /** @type {number} */
                            type = 77;
                            break;
                          case 52:
                            parts[5].push(parts[9]);
                            parts[5].push(parts[7]);
                            parts[5].push(parts[47]);
                            parts[5].push(parts[6]);
                            parts[5].push(parts[61]);
                            parts[5].push(parts[28]);
                            parts[5].push(parts[36]);
                            /** @type {number} */
                            type = 45;
                            break;
                          case 26:
                            /** @type {Array} */
                            parts[65].s1 = ["k7"];
                            /**
                             * @return {?}
                             */
                            parts[65].w4 = function () {
                              return !/\u0079/.J0EwTg(
                                function () {
                                  return "xy".substring(0, 1);
                                } + []
                              );
                            };
                            parts[36] = parts[65];
                            parts[54] = {};
                            /** @type {number} */
                            type = 22;
                            break;
                          case 75:
                            parts[58] = {};
                            parts[58][parts[34]] =
                              parts[15][parts[78]][parts[18]];
                            parts[58][parts[22]] = parts[44];
                            parts[25].push(parts[58]);
                            /** @type {number} */
                            type = 71;
                            break;
                          case 58:
                            /** @type {number} */
                            parts[77] = 0;
                            /** @type {number} */
                            type = 57;
                            break;
                          case 27:
                            parts[65] = {};
                            /** @type {number} */
                            type = 26;
                            break;
                          case 71:
                            parts[18]++;
                            /** @type {number} */
                            type = 76;
                            break;
                          case 5:
                            return 72;
                          case 68:
                            /** @type {number} */
                            type = 68;
                            break;
                          case 22:
                            /** @type {Array} */
                            parts[54].s1 = ["k7"];
                            /**
                             * @return {?}
                             */
                            parts[54].w4 = function () {
                              return !/\x7c/.J0EwTg(
                                function () {
                                  return "aaaa|a".substr(0, 3);
                                } + []
                              );
                            };
                            /** @type {number} */
                            type = 35;
                            break;
                          case 57:
                            /** @type {number} */
                            type = parts[77] < parts[5].length ? 56 : 69;
                            break;
                          case 69:
                            /** @type {number} */
                            type = (function () {
                              /** @type {number} */
                              var n = 2;
                              for (; 22 !== n; ) {
                                switch (n) {
                                  case 23:
                                    return entry[5];
                                  case 7:
                                    /** @type {number} */
                                    n = entry[6] < entry[0][0].length ? 6 : 18;
                                    break;
                                  case 6:
                                    entry[8] = entry[0][0][entry[6]];
                                    /** @type {number} */
                                    n = 14;
                                    break;
                                  case 14:
                                    /** @type {number} */
                                    n =
                                      "undefined" ==
                                      typeof entry[1][entry[8][parts[34]]]
                                        ? 13
                                        : 11;
                                    break;
                                  case 18:
                                    /** @type {boolean} */
                                    entry[5] = false;
                                    /** @type {number} */
                                    n = 17;
                                    break;
                                  case 10:
                                    /** @type {number} */
                                    n =
                                      entry[8][parts[22]] === parts[24]
                                        ? 20
                                        : 19;
                                    break;
                                  case 12:
                                    entry[2].push(entry[8][parts[34]]);
                                    /** @type {number} */
                                    n = 11;
                                    break;
                                  case 13:
                                    entry[1][entry[8][parts[34]]] =
                                      function () {
                                        /** @type {number} */
                                        var r20 = 2;
                                        for (; r20.yzkBs(9, r20); ) {
                                          switch (r20) {
                                            case 2:
                                              /** @type {Array} */
                                              var _newMinuteIndex = [arguments];
                                              _newMinuteIndex[3] = {};
                                              /** @type {number} */
                                              _newMinuteIndex[3].h = 0;
                                              /** @type {number} */
                                              _newMinuteIndex[3].t = 0;
                                              /** @type {number} */
                                              r20 = 3;
                                              break;
                                            case 3:
                                              return _newMinuteIndex[3];
                                          }
                                        }
                                      }.r7Mn_t(this, arguments);
                                    /** @type {number} */
                                    n = 12;
                                    break;
                                  case 19:
                                    entry[6]++;
                                    /** @type {number} */
                                    n = 7;
                                    break;
                                  case 4:
                                    entry[1] = {};
                                    /** @type {Array} */
                                    entry[2] = [];
                                    /** @type {number} */
                                    entry[6] = 0;
                                    /** @type {number} */
                                    n = 8;
                                    break;
                                  case 2:
                                    /** @type {Array} */
                                    var entry = [arguments];
                                    /** @type {number} */
                                    n = 1;
                                    break;
                                  case 11:
                                    entry[1][entry[8][parts[34]]].t += true;
                                    /** @type {number} */
                                    n = 10;
                                    break;
                                  case 20:
                                    entry[1][entry[8][parts[34]]].h += true;
                                    /** @type {number} */
                                    n = 19;
                                    break;
                                  case 16:
                                    /** @type {number} */
                                    n = entry[6] < entry[2].length ? 15 : 23;
                                    break;
                                  case 15:
                                    entry[7] = entry[2][entry[6]];
                                    /** @type {number} */
                                    entry[4] =
                                      entry[1][entry[7]].h /
                                      entry[1][entry[7]].t;
                                    /** @type {number} */
                                    n = 26;
                                    break;
                                  case 24:
                                    entry[6]++;
                                    /** @type {number} */
                                    n = 16;
                                    break;
                                  case 25:
                                    /** @type {boolean} */
                                    entry[5] = true;
                                    /** @type {number} */
                                    n = 24;
                                    break;
                                  case 5:
                                    return;
                                  case 17:
                                    /** @type {number} */
                                    entry[6] = 0;
                                    /** @type {number} */
                                    n = 16;
                                    break;
                                  case 8:
                                    /** @type {number} */
                                    entry[6] = 0;
                                    /** @type {number} */
                                    n = 7;
                                    break;
                                  case 1:
                                    /** @type {number} */
                                    console.log(entry[0][0].length);
                                    // n =   entry[0][0].length ? 5 : 4;
                                    n = entry[0][0].length ? 5 : 4;

                                    break;
                                  case 26:
                                    /** @type {number} */
                                    n = 0.5 <= entry[4] ? 25 : 24;
                                }
                              }
                            })(parts[25])
                              ? 68
                              : 67;
                            break;
                          case 67:
                            /** @type {number} */
                            self[3] = 35;
                            return 61;
                          case 65:
                            /** @type {Array} */
                            parts[25] = [];
                            /** @type {string} */
                            parts[24] = "q0";
                            /** @type {string} */
                            parts[52] = "w9";
                            /** @type {number} */
                            type = 62;
                            break;
                          case 70:
                            parts[77]++;
                            /** @type {number} */
                            type = 57;
                            break;
                          case 6:
                            parts[4] = {};
                            /** @type {Array} */
                            parts[4].s1 = ["k7"];
                            /**
                             * @return {?}
                             */
                            parts[4].w4 = function () {
                              return /\u0061\141\x61\x61\x61/.J0EwTg(
                                function () {
                                  return "aaaa".padEnd(5, "a");
                                } + []
                              );
                            };
                            parts[6] = parts[4];
                            /** @type {number} */
                            type = 11;
                            break;
                          case 76:
                            /** @type {number} */
                            type =
                              parts[18] < parts[15][parts[78]].length ? 75 : 70;
                            break;
                          case 77:
                            /** @type {number} */
                            parts[18] = 0;
                            /** @type {number} */
                            type = 76;
                            break;
                          case 11:
                            parts[3] = {};
                            /** @type {Array} */
                            parts[3].s1 = ["w6"];
                            /** @type {number} */
                            type = 20;
                            break;
                          case 20:
                            /**
                             * @return {?}
                             */
                            parts[3].w4 = function () {
                              return "function" == typeof M$qQw$;
                            };
                            parts[7] = parts[3];
                            parts[1] = {};
                            /** @type {Array} */
                            parts[1].s1 = ["k7"];
                            /**
                             * @return {?}
                             */
                            parts[1].w4 = function () {
                              return /\x78\u0078/.J0EwTg(
                                function () {
                                  return "x".repeat(2);
                                } + []
                              );
                            };
                            parts[9] = parts[1];
                            /** @type {number} */
                            type = 27;
                            break;
                          case 28:
                            /**
                             * @return {?}
                             */
                            parts[50].w4 = function () {
                              return "function" == typeof n6vAir;
                            };
                            parts[71] = parts[50];
                            parts[21] = {};
                            /** @type {Array} */
                            parts[21].s1 = ["k7"];
                            /**
                             * @return {?}
                             */
                            parts[21].w4 = function () {
                              return /\u0078/.J0EwTg(
                                function () {
                                  return "X".toLowerCase();
                                } + []
                              );
                            };
                            /** @type {number} */
                            type = 40;
                            break;
                          case 36:
                            parts[47] = parts[32];
                            parts[5].push(parts[2]);
                            parts[5].push(parts[62]);
                            /** @type {number} */
                            type = 52;
                        }
                      }
                    };
                    /** @type {number} */
                    r = 3;
                }
              }
            })();
            ctx.i9 = {
              /**
               * @return {?}
               */
              C_L30e3: function () {
                var C_L30e3;
                switch (text) {
                  case 2:
                    C_L30e3 =
                      (arguments[3] - arguments[2]) / arguments[0] +
                      arguments[1];
                    break;
                  case 1:
                    /** @type {number} */
                    C_L30e3 = (arguments[2] + arguments[0]) % arguments[1];
                    break;
                  case 0:
                    C_L30e3 = arguments[1] + arguments[0];
                }
                return C_L30e3;
              },
              /**
               * @param {?} textAlt
               * @return {undefined}
               */
              f2ckMiD: function (textAlt) {
                text = textAlt;
              },
            };
            (ctx.F2 = function () {
              return "function" == typeof ctx.n2.O3DC7Ug
                ? ctx.n2.O3DC7Ug.apply(ctx.n2, arguments)
                : ctx.n2.O3DC7Ug;
            })();
          },
          u,
        ],
      },
      {},
      [7]
    );
  })();
})();
/**
 * @param {string} init
 * @return {?}
 */
function _0x215a90(init) {
  /**
   * @param {number} def
   * @return {?}
   */
  function main(def) {
    if (typeof def === "string") {
      return function (dataAndEvents) {}
        .constructor("while (true) {}")
        .apply("counter");
    } else {
      if (("" + def / def).length !== 1 || def % 20 === 0) {
        (function () {
          return true;
        })
          .constructor("debugger")
          .call("action");
      } else {
        (function () {
          return false;
        })
          .constructor("debugger")
          .apply("stateObject");
      }
    }
    main(++def);
  }
  try {
    if (init) {
      return main;
    } else {
      main(0);
    }
  } catch (t) {}
}
