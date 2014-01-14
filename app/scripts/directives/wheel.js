(function() {
  "use strict";
  angular.module('horseApp').directive("wheelGame", [
    "$location", function($location) {
      return {
        restrict: "EC",
        replace: true,
        template: "<div>" + "<div class=\"wheel\">" + "<div class=\"shine\"></div>" + "</div>" + "<div class=\"seam\"><div class=\"hand callToAction\"></div><div class=\"howto\"><div id=\"arrow1\"></div><div id=\"arrow2\"></div><div id=\"arrow3\"></div></div></div>" + "<div class=\"stick\"></div>" + "</div>",
        link: function($rootScope, $scope) {
          /*
          Computes the rotation degrees of an html element
          @param <element> element
          @return <number> angle
          */

          var $target, FRICTION, THRESHOLD, degs, f, frameRateMS, getFinalPosition, getRotationDegrees, handleTouchyRotate, inGame, inertiaMotion, rotate, spin, velocity;
          getRotationDegrees = function(element) {
            var a, angle, b, matrix, values;
            matrix = element.css("-webkit-transform") || element.css("transform");
            if (matrix !== "none") {
              values = matrix.split("(")[1].split(")")[0].split(",");
              a = values[0];
              b = values[1];
              angle = Math.floor(Math.atan2(b, a) * (180 / Math.PI));
              if (angle < 0) {
                return angle += 360;
              } else {
                return angle;
              }
            } else {
              return 0;
            }
          };
          /*
          Computes the final position of the wheel based on its initial position
          and its velocity
          @param <number> initPos
          @param <number> velocity
          @return <number> finalPos
          */

          getFinalPosition = function(initPos, velocity) {
            var finalPos, spin_final, spin_i;
            spin_final = 0;
            spin_i = 0;
            finalPos = initPos;
            spin_final = Math.ceil((Math.log(FRICTION) - Math.log(Math.abs(velocity))) / Math.log(1 - FRICTION)) + 1;
            spin_i = 0;
            while (spin_i <= spin_final) {
              finalPos += velocity * Math.pow(1 - FRICTION, spin_i) * frameRateMS;
              if (finalPos > 359.99) {
                finalPos = 0;
              } else {
                if (finalPos < 0) {
                  finalPos = 359.99;
                }
              }
              spin_i++;
            }
            return finalPos;
          };
          FRICTION = 0.03;
          THRESHOLD = 0.5;
          degs = 0;
          velocity = 0;
          $target = $(".wheel");
          frameRateMS = 1000 / 60;
          inertiaMotion = false;
          inGame = false;
          f = 1 - FRICTION;
          handleTouchyRotate = function(e, phase, $target, data) {
            switch (phase) {
              case "start":
                inertiaMotion = false;
                return velocity = 0;
              case "move":
                degs += data.degreeDelta;
                return rotate(degs, data.velocity);
              case "end":
                inertiaMotion = true;
                velocity = data.velocity;
                if (velocity > 3.9) {
                  velocity = -2;
                }
                return spin(velocity);
            }
          };
          /*
          Recursive function to make spin motion
          Emits signal to the parent controller in order to change route dynamically
          Includes fake motion to stop in a area given by $scope.result
          @param <number> velocity
          @emit <signal> wheelGameStartEvent
          @emit <signal> wheelGameFinishEvent
          */

          spin = function(velocity) {
            var finalPos;
            degs += velocity * frameRateMS;
            degs = (degs > 359.99 ? 0 : degs);
            rotate(degs, velocity);
            if (!inGame && Math.abs(velocity) > THRESHOLD) {
              $(".wheel").removeClass("start");
              $(".hand").removeClass("callToAction");
              $(".hand").css("opacity", 0);
              $(".howto").css("opacity", 0);
              inGame = true;
              if (velocity > 0) {
                velocity = 2;
              } else {
                velocity = -2;
              }
            }
            finalPos = getFinalPosition(getRotationDegrees($(".wheel")), velocity);
            switch ($scope.result) {
              case "item1":
                if (finalPos > 5 && finalPos < 85) {
                  f = 1 - FRICTION;
                } else {
                  f = 1;
                }
                break;
              case "item2":
                if (finalPos > 95 && finalPos < 175) {
                  f = 1 - FRICTION;
                } else {
                  f = 1;
                }
                break;
              case "item3":
                if (finalPos > 185 && finalPos < 265) {
                  f = 1 - FRICTION;
                } else {
                  f = 1;
                }
                break;
              case "item4":
                if (finalPos > 275 && finalPos < 355) {
                  f = 1 - FRICTION;
                } else {
                  f = 1;
                }
                break;
            }
            if (Math.abs(velocity) > FRICTION && inertiaMotion) {
              return setTimeout((function() {
                return spin(velocity * f);
              }), frameRateMS);
            } else {
              velocity = 0;
              if (inGame) {
                return $rootScope.$emit("rotate-wheel-stop");
              }
            }
          };
          /*
          Applies CSS transform rotate property to the target element
          @param <number> degrees
          */

          rotate = function(degrees, velocity) {
            $target.css("webkitTransform", "rotate(" + degrees + "deg)");
            if (velocity < 0.03) {
              velocity = 0;
            }
            return $rootScope.$emit("rotate-wheel", {
              velocity: velocity
            });
          };
          return $(".wheel").bind("touchy-rotate", handleTouchyRotate);
        }
      };
    }
  ]);

}).call(this);

/*
//@ sourceMappingURL=wheel.js.map
*/