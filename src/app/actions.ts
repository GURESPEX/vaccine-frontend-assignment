import { FormError } from "./types/form";

export async function submit(state: FormError, formData: FormData) {
    let formError: FormError = {
        status: false
    }

    const personName = formData.get("personName") || null;
    const personId = formData.get("personId") || null;
    const gender = formData.get("gender") || null;
    const dateOfBirth = formData.get("dateOfBirth") && new Date(formData.get("dateOfBirth") as string);

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
        formError = { status: true, message: "ข้อมูลครบถ้วน" }
    }

    return formError;
}