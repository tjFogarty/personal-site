/* eslint-disable no-undef */
registerPaint(
  'separator',
  class {
    static get inputProperties() {
      return [
        'background-color',
        '--separator-shape',
        '--separator-size',
        '--separator-shadow',
        '--separator-shadow-color'
      ]
    }

    paint(ctx, geom, props, args) {
      const color = props.get('background-color').toString()
      const shadowFactor = this.clamp(
        props.get('--separator-shadow').toString(),
        0,
        1
      )
      const shadowColor = props.get('--separator-shadow-color').toString()
      const shape = props.get('--separator-shape').toString()

      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.lineTo(geom.width, 0)

      ctx.quadraticCurveTo(
        geom.width / 2,
        geom.height,
        0,
        geom.height * shadowFactor
      )

      ctx.closePath()

      // fill
      ctx.fillStyle = color
      ctx.fill()

      ctx.beginPath()

      if (shape === 'curve-right') {
        ctx.moveTo(geom.width, 0)
        ctx.quadraticCurveTo(
          geom.width / 2,
          geom.height,
          0,
          geom.height * shadowFactor
        )
        ctx.lineTo(0, 0)
        ctx.quadraticCurveTo(geom.width / 2, geom.height, geom.width, 0)
      }

      ctx.closePath()

      // fill
      ctx.fillStyle = shadowColor
      ctx.fill()
    }

    clamp(val, min, max) {
      return Math.max(min, Math.min(max, val))
    }
  }
)
