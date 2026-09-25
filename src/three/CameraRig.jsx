import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { CAMERA_KEYFRAMES } from './cameraPath'
import { sampleVec3, sampleNum, envelope } from '../utils/keyframes'
import { scrollState } from '../utils/scrollState'

export default function CameraRig() {
  const { camera } = useThree()
  const targetPos = useRef(new THREE.Vector3())
  const targetLook = useRef(new THREE.Vector3())
  const currentLook = useRef(new THREE.Vector3(0, 0.15, 0))

  useFrame((_, delta) => {
    const t = scrollState.progress

    const pos = sampleVec3(CAMERA_KEYFRAMES, 'pos', t)
    const look = sampleVec3(CAMERA_KEYFRAMES, 'look', t)
    const fov = sampleNum(CAMERA_KEYFRAMES, 'fov', t)

    // subtle mouse parallax, strongest in the hero and fading out quickly
    const heroIntensity = 1 - envelope(t, -0.05, 0, 0.02, 0.12)
    const parallaxX = scrollState.mouseX * 0.14 * heroIntensity
    const parallaxY = -scrollState.mouseY * 0.08 * heroIntensity

    targetPos.current.set(pos[0] + parallaxX, pos[1] + parallaxY, pos[2])
    targetLook.current.set(look[0], look[1], look[2])

    const damp = 1 - Math.pow(0.001, delta)
    camera.position.lerp(targetPos.current, Math.min(damp * 2.2, 1))
    currentLook.current.lerp(targetLook.current, Math.min(damp * 2.2, 1))
    camera.lookAt(currentLook.current)

    if (camera.isPerspectiveCamera) {
      camera.fov = THREE.MathUtils.lerp(camera.fov, fov, Math.min(damp * 1.6, 1))
      camera.updateProjectionMatrix()
    }
  })

  return null
}
