export const globalVariables = {
    // Request URLs
    BASE_URL: "https://holicare.herokuapp.com/api/v1/",
    BASE_URL_2: "http://196.43.134.157:8000/api/v1/",
    BASE_URL_3: "http://196.43.134.157:8000/",

    // Request Headers
    CONTENT_TYPE: "application/json",
    CONTENT_TYPE_MEDIA: "multipart/form-data",
    ACCEPT: "application/json",
    ACCEPT_ALL: "*/*",
    ALLOW_ORIGIN: "http://localhost:3000", // For development, not droduction

    // Request Methods
    METHOD_POST: "POST",
    METHOD_DELETE: "DELETE",
    METHOD_PUT: "PUT",

    // Hospitals API End-points
    END_POINT_HOSPITAL: "hospital/",

    // Districts API End-points
    END_POINT_DISTRICT: "district/",

    // Risk Factors API End-points
    END_POINT_RISK_FACTOR: "riskfactor/",

    // Infections API End-points
    END_POINT_INFECTION: "infection/",

    // Patients API End-points
    END_POINT_PATIENT: "patients/patients/",

    // Clinicians [Doctors, Nurses, ] API End-points
    END_POINT_CLINICIAN: "clinician/",

    // Hospital Admins API End-points
    END_POINT_HOSPITAL_ADMIN: "hospital_admin/",

    // General Admins API End-points
    END_POINT_ADMIN: "admins/",

    // Authentication API End-points
    END_POINT_SIGN_IN: "auth/login/",
    END_POINT_SIGN_UP: "auth/register/",
    END_POINT_SIGN_OUT: "auth/logout/",
    END_POINT_VERIFY_EMAIL: "auth/email-verify/",
    END_POINT_REFRESH_TOKEN: "auth/token/refresh/",
    END_POINT_RESET_PASSWORD: "auth/password-reset-complete",
    END_POINT_RESET_EMAIL: "auth/request-reset-email/",
}