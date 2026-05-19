'use client'
import { useEffect, useRef, useState } from 'react'
import createGlobe from 'cobe'

export default function Globe() {
    const canvasRef = useRef()
    const phiRef = useRef(0)
    const thetaRef = useRef(0.3)
    const isDragging = useRef(false)
    const lastX = useRef(0)
    const lastY = useRef(0)

    useEffect(() => {
        if (!canvasRef.current) return

        const globe = createGlobe(canvasRef.current, {
            devicePixelRatio: 2,
            width: 600 * 2,
            height: 600 * 2,
            phi: 0,
            theta: 0.3,
            dark: 1,
            diffuse: 1.2,
            mapSamples: 16000,
            mapBrightness: 8,
            baseColor: [0.3, 0.3, 0.3],
            markerColor: [0.6, 0.3, 1],
            glowColor: [0.5, 0.2, 1],
            markers: [
                { location: [26.9124, 75.7873], size: 0.08 }, // Jaipur
            ],
            onRender: (state) => {
                // ✅ Auto rotate only when NOT dragging
                if (!isDragging.current) {
                    phiRef.current += 0.005
                }
                state.phi = phiRef.current
                state.theta = thetaRef.current
            }
        })

        // ✅ Mouse Events
        const canvas = canvasRef.current

        const onMouseDown = (e) => {
            isDragging.current = true
            lastX.current = e.clientX
            lastY.current = e.clientY
            canvas.style.cursor = 'grabbing'
        }

        const onMouseMove = (e) => {
            if (!isDragging.current) return
            const deltaX = e.clientX - lastX.current
            const deltaY = e.clientY - lastY.current
            phiRef.current += deltaX * 0.005    // horizontal drag
            thetaRef.current += deltaY * 0.005  // vertical drag

            // ✅ Clamp theta so globe doesn't flip upside down
            thetaRef.current = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, thetaRef.current))

            lastX.current = e.clientX
            lastY.current = e.clientY
        }

        const onMouseUp = () => {
            isDragging.current = false
            canvas.style.cursor = 'grab'
        }

        // ✅ Touch Events (mobile support)
        const onTouchStart = (e) => {
            isDragging.current = true
            lastX.current = e.touches[0].clientX
            lastY.current = e.touches[0].clientY
        }

        const onTouchMove = (e) => {
            if (!isDragging.current) return
            const deltaX = e.touches[0].clientX - lastX.current
            const deltaY = e.touches[0].clientY - lastY.current
            phiRef.current += deltaX * 0.005
            thetaRef.current += deltaY * 0.005
            thetaRef.current = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, thetaRef.current))
            lastX.current = e.touches[0].clientX
            lastY.current = e.touches[0].clientY
        }

        const onTouchEnd = () => {
            isDragging.current = false
        }

        // ✅ Add all listeners
        canvas.addEventListener('mousedown', onMouseDown)
        window.addEventListener('mousemove', onMouseMove)
        window.addEventListener('mouseup', onMouseUp)
        canvas.addEventListener('touchstart', onTouchStart)
        canvas.addEventListener('touchmove', onTouchMove)
        canvas.addEventListener('touchend', onTouchEnd)

        return () => {
            globe.destroy()
            // ✅ Clean up listeners
            canvas.removeEventListener('mousedown', onMouseDown)
            window.removeEventListener('mousemove', onMouseMove)
            window.removeEventListener('mouseup', onMouseUp)
            canvas.removeEventListener('touchstart', onTouchStart)
            canvas.removeEventListener('touchmove', onTouchMove)
            canvas.removeEventListener('touchend', onTouchEnd)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            style={{
                width: '600px',
                height: '600px',
                cursor: 'grab',        // ✅ shows grab cursor
            }}
        />
    )
}