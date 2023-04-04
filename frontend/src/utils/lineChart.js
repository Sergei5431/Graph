export const container = document.querySelector('.wrapper')
import { numberMin, numberMax } from './randomArr'

class Chart {
    createSvgElement(tagName) {
        return document.createElementNS('http://www.w3.org/2000/svg', tagName)
    }

    setAttributes(svgElement, attributesObject) {
        Object.keys(attributesObject).forEach((e) => {
            svgElement.setAttribute(e, attributesObject[e])
        })
    }
}

export class LineChart extends Chart {
    horizontalPadding = 30;
    buttonYPadding = 30;
    topYPadding = 30;
    chartLineStrokeWidth = 5;
    circleRadius = 6

    constructor(data, container, color) {
        super();
        this.data = data;
        this.container = container;
        this.maxWidth = this.container.offsetWidth;
        this.maxHight = this.container.offsetHeight;
        this.color = color;
        this.maxChartWidth = this.maxWidth - this.horizontalPadding * 3
        this.maxChartHeight = this.maxHight - this.buttonYPadding - this.topYPadding
        this.maxY = numberMax 
        this.minY = numberMin
        this.zoom = this.maxChartHeight / (this.maxY - this.minY)
        if (this.zoom < 0) {
            this.zoom = 1 + this.zoom
        }
        if (!isFinite(this.zoom)) {
            this.zoom = 1
        }
    }

    colorFun(){

    }

    createChartLine() {
        const chartLine = this.createSvgElement('path')

        this.setAttributes(chartLine, {
            stroke: this.color,
            // stroke: this.colorFun(),
            'stroke-width': this.chartLineStrokeWidth,
            fill: 'none',
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round'
        })
        return chartLine

    }

    createAxisXSeparator() {
        const axisXLine = this.createSvgElement('line');
        this.setAttributes(axisXLine, {
            x1: 0,
            x2: this.maxWidth,
            y1: this.maxChartHeight + this.topYPadding + this.chartLineStrokeWidth,
            y2: this.maxChartHeight + this.topYPadding + this.chartLineStrokeWidth,
            stroke: 'black',
            'stroke-width': 1
        })
        return axisXLine
    }

    createTicks() {
        //высота для каждой точки
        const heightPerTic = 90
        // сколько будет точек
        const ticksCount = this.maxChartHeight / heightPerTic
        // разница между настоящими значениями "Y" для каждой пометки
        const tickAdd = (this.maxY - this.minY) / ticksCount
        // отрисовать отметки
        const ticks = []

        for (let i = 0; i < ticksCount; i++) {
            const currentY = heightPerTic * i + this.topYPadding - this.circleRadius
            const tick = this.createSvgElement('line')
            this.setAttributes(tick, {
                x1: this.horizontalPadding,
                x2: this.maxChartWidth + this.horizontalPadding,
                y1: currentY,
                y2: currentY,
                'stroke-width': 0.5,
                stroke: 'grey'
            })
            ticks.push(tick)
        }
        return ticks
    }

    createCircle(el, x, y) {
        const circle = this.createSvgElement('circle')
        this.setAttributes(circle, {
            r: this.circleRadius,
            cx: x,
            cy: y,
            fill: 'grey'
        })
        circle.dataset.text = `x: ${el.x}, y:${el.y}`
        circle.dataset.circle = 'true'
        return circle
    }

    search() {
        const svgs = document.querySelectorAll('[data-svg = "true"]')
        if (svgs) {
            svgs.forEach(e => e.remove())
        }
    }

    create() {
        const svg = this.createSvgElement('svg');
        svg.dataset.svg = 'true'
        this.setAttributes(svg, {
            width: '100%',
            hight: '100%',
            viewBox: `0 0 ${this.maxWidth} ${this.maxHight}`
        })

        const chartLine = this.createChartLine()
        const ticks = this.createTicks()
        const legendXLine = this.createAxisXSeparator()

        const lineLength = this.maxChartWidth / (this.data.length - 1)
        const yShift = this.minY * this.zoom

        let d = 'M '
        let currentX = 0 + this.horizontalPadding

        this.data.forEach((el, i) => {
            const x = currentX;
            const y = this.maxChartHeight - el.y * this.zoom + yShift + this.topYPadding - this.circleRadius

            d += `${x} ${y} L `

            const circle = this.createCircle(el, x, y)
            const legendXText = this.createSvgElement('text')
            this.setAttributes(legendXText, {
                x: currentX,
                y: this.maxHight - 5,
            })

            legendXText.textContent = el.x
            svg.append(circle, legendXText)

            currentX += lineLength
        })

        d = d.slice(0, -3)
        chartLine.setAttribute('d', d)
        svg.append(...ticks, chartLine, legendXLine,)
        this.container.appendChild(svg)
        return this
    }
}