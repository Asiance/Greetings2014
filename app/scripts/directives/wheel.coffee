
"use strict"

angular.module('horseApp').directive "wheelGame", [ ->
  restrict: "EC"
  replace: true
  template: "<div>" + "<div class=\"wheel\">" + "<div class=\"shine\"></div>" + "</div>" + "<div class=\"seam\"><div class=\"hand callToAction\"></div><div class=\"howto\"><div id=\"arrow1\"></div><div id=\"arrow2\"></div><div id=\"arrow3\"></div></div></div>" + "<div class=\"stick\"></div>" + "</div>"

  link: ($rootScope, $scope) ->
    ###
    Computes the rotation degrees of an html element
    @param <element> element
    @return <number> angle
    ###
    getRotationDegrees = (element) ->
      matrix = element.css("-webkit-transform") or element.css("transform")
      if matrix isnt "none"
        values = matrix.split("(")[1].split(")")[0].split(",")
        a = values[0]
        b = values[1]
        angle = Math.floor(Math.atan2(b, a) * (180 / Math.PI))
        (if (angle < 0) then angle += 360 else angle)
      else
        0

    ###
    Computes the final position of the wheel based on its initial position
    and its velocity
    @param <number> initPos
    @param <number> velocity
    @return <number> finalPos
    ###
    getFinalPosition = (initPos, velocity) ->
      spin_final = 0
      spin_i = 0
      finalPos = initPos
      spin_final = Math.ceil((Math.log(FRICTION) - Math.log(Math.abs(velocity))) / Math.log(1 - FRICTION)) + 1
      spin_i = 0
      while spin_i <= spin_final
        finalPos += velocity * Math.pow(1 - FRICTION, spin_i) * frameRateMS
        if finalPos > 359.99
          finalPos = 0
        else finalPos = 359.99  if finalPos < 0
        spin_i++
      finalPos

    FRICTION = 0.03
    THRESHOLD = 0.5
    degs = 0
    velocity = 0
    $target = $(".wheel")
    frameRateMS = 1000 / 60
    inertiaMotion = false
    inGame = false
    f = 1 - FRICTION

    handleTouchyRotate = (e, phase, $target, data) ->
      switch phase
        when "start"
          inertiaMotion = false
          velocity = 0
        when "move"
          degs += data.degreeDelta
          rotate degs, data.velocity
        when "end"
          inertiaMotion = true
          velocity = data.velocity
          velocity = -2  if velocity > 3.9
          spin velocity

    ###
    Recursive function to make spin motion
    Emits signal to the parent controller in order to change route dynamically
    Includes fake motion to stop in a area given by $scope.result
    @param <number> velocity
    @emit <signal> wheelGameStartEvent
    @emit <signal> wheelGameFinishEvent
    ###
    spin = (velocity) ->

      # Touchy returns velocity as degrees per millisecond only for touchy-rotate
      degs += velocity * frameRateMS
      degs = (if degs > 359.99 then 0 else degs)
      rotate degs, velocity

      # Scenario 3 : Launch the wheel and see where it stops
      if not inGame and Math.abs(velocity) > THRESHOLD
        $(".wheel").removeClass "start"
        $(".hand").removeClass "callToAction"
        $(".hand").css "opacity", 0
        $(".howto").css "opacity", 0
        inGame = true
        if velocity > 0
          velocity = 2
        else
          velocity = -2

      finalPos = getFinalPosition(getRotationDegrees($(".wheel")), velocity)
      switch $scope.result
        when "item1"
          if finalPos > 5 and finalPos < 85
            f = 1 - FRICTION
          else
            f = 1
        when "item2"
          if finalPos > 95 and finalPos < 175
            f = 1 - FRICTION
          else
            f = 1
        when "item3"
          if finalPos > 185 and finalPos < 265
            f = 1 - FRICTION
          else
            f = 1
        when "item4"
          if finalPos > 275 and finalPos < 355
            f = 1 - FRICTION
          else
            f = 1
        else
      if Math.abs(velocity) > FRICTION and inertiaMotion
        setTimeout (->
          spin velocity * f
        ), frameRateMS
      else
        velocity = 0
        if inGame
          $rootScope.$emit "rotate-wheel-stop"

    ###
    Applies CSS transform rotate property to the target element
    @param <number> degrees
    ###
    rotate = (degrees, velocity) ->
      $target.css "webkitTransform", "rotate(" + degrees + "deg)"
      if velocity < 0.03
        velocity = 0
      $rootScope.$emit "rotate-wheel",
        velocity: velocity

    return $(".wheel").bind "touchy-rotate", handleTouchyRotate
]