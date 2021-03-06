import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"


const createFeedbackSpy = jest.fn()
const sendMailSpy = jest.fn()

const submitFeedback = new SubmitFeedbackUseCase(
    { create: createFeedbackSpy },
    { sendMail: sendMailSpy }
)


describe("Submit feedback", () => {
    it("Should be able to submit a feedback", async () => {
        await expect(submitFeedback.execute({
                type: "BUG",
                comment: "Tá tudo bugado",
        })).resolves.not.toThrow()


        expect(createFeedbackSpy).toHaveBeenCalled()
        expect(sendMailSpy).toHaveBeenCalled()
    })


    it("Should not be able to submit a feedback without type", async () => {
        await expect(submitFeedback.execute({
                type: "",
                comment: "Tá tudo bugado",
        })).rejects.toThrow()
    })


    it("Should not be able to submit a feedback without comment", async () => {
        await expect(submitFeedback.execute({
                type: "BUG",
                comment: "",
        })).rejects.toThrow()
    })


    it("Should not be able to submit a feedback with an invalid screenshot", async () => {
        await expect(submitFeedback.execute({
                type: "BUG",
                comment: "Tá tudo bugado",
                screenshot: "image.png"
        })).rejects.toThrow()
    })    
})