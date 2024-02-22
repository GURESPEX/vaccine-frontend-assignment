import { FormError } from "./types/form";

export async function submit(state: FormError, formData: FormData) {
    let formError: FormError = {
        status: false
    }

    const personName = formData.get("personName") as string || null;
    const personId = formData.get("personId") as string || null;
    const gender = formData.get("gender") as string || null;
    const dateOfBirth = formData.get("dateOfBirth") as string || null;

    console.log({
        personName,
        personId,
        gender,
        dateOfBirth
    });

    if (!personName) {
        formError = { status: false, message: "โปรดกรอกชื่อและนามสกุล" }
    } else if (!personId) {
        formError = { status: false, message: "โปรดกรอกเลขบัตรประจำตัวประชาชน" }
    } else if (!(new RegExp("\\d+").test(personId as string) && (personId as string).length == 13)) {
        formError = { status: false, message: "เลขบัตรประจำตัวประชาชนต้องมีความยาว 13 ตัวอักษร" }
    } else if (!gender) {
        formError = { status: false, message: "โปรดระบุเพศ" }
    } else if (!dateOfBirth) {
        formError = { status: false, message: "โปรดระบุวันเดือนปีเกิด" }
    } else {
        formError = {
            status: true, message: "ข้อมูลครบถ้วน", data: {
                personName,
                personId,
                gender,
                dateOfBirth
            }
        }
    }

    return formError;
}