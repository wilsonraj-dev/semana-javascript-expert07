export default class HandGestureService {
    #fingerpose
    #handPoseDetection
    #handVersion
    #detector = null
    constructor({ fingerpose, handPoseDetection, handVersion }) {
        this.#fingerpose = fingerpose
        this.#handPoseDetection = handPoseDetection
        this.#handVersion = handVersion
    }

    async estimateHands(video) {
        return this.#detector.estimateHands(video, {
            flipHorizontal: true
        })
    }

    async initializeDetector() {
        if(this.#detector) return this.#detector

        const dectorConfig = {
            runtime: 'mediapipe',
            solutionPath: `https://cdn.jsdelivr.net/npm/@mediapipe/hands@${this.#handVersion}`,
            modelType: 'lite',
            maxHands: 2
        }

        this.#detector = await this.#handPoseDetection.createDetector(
            this.#handPoseDetection.SupportedModels.MediaPipeHands,
            dectorConfig
        )

        return this.#detector
    }
}