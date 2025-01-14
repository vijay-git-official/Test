import { useFormik } from 'formik';
import * as Yup from 'yup';

const FormikForm = () => {

    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Invalid Email Format") 
            .required("Email is required"),

        password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
    });

    const {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
    } = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {
            console.log("form data", values);
            resetForm();
        },
    });

    return (
        <div className="w-6/12">
            <h2 className="text-2xl font-bold mt-5">Formik Form</h2>

            <form onSubmit={handleSubmit}>
                <div className="flex flex-col mt-9 border rounded-lg shadow-lg px-9 py-11">
                    <input
                        name="email"
                        type="email"
                        placeholder="Enter Email"
                        className="border p-2 rounded-lg"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {touched.email && errors.email && (
                        <div className="text-red-500 text-sm mt-1">{errors.email}</div>
                    )}

                    <input
                        name="password"
                        type="password"
                        placeholder="Enter Password"
                        className="mt-5 border p-2 rounded-lg"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {touched.password && errors.password && (
                        <div className="text-red-500 text-sm mt-1">{errors.password}</div>
                    )}

                    <button type="submit" className="mt-5 border p-2 bg-green-500 text-white rounded-lg">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

export default FormikForm;
