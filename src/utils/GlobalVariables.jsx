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
    END_POINT_REGION: "districts/region/",
    END_POINT_DISTRICT: "districts/district/",
    END_POINT_COUNTY: "districts/county/",
    END_POINT_SUBCOUNTY: "districts/subcounty/",
    END_POINT_PARISH: "districts/parish/",
    END_POINT_LOCATION: "districts/location/",

    // Risk Factors API End-points
    END_POINT_RISK_FACTOR: "riskfactor/",

    // Infections API End-points
    END_POINT_INFECTION: "infection/",

    // Patients API End-points
    END_POINT_PATIENT: "patients/patients/",
    END_POINT_VITALS: "patients/vitals/",
    END_POINT_VISITS: "patients/visits/",
    END_POINT_SYMPTOMS: "patients/symptoms/",
    END_POINT_ALLERGIES: "patients/allergies/",
    END_POINT_CONDITIONS: "patients/conditions/",
    END_POINT_APPOINTMENT: "patients/appointments/",
    END_POINT_MEDICATIONS: "patients/medications/",
    END_POINT_ANTHROPOMETRIC: "patients/anthropometric/",
    END_POINT_PROVISIONAL_DIAGNOSIS: "patients/provisional-diagnosis/",

    // Clinicians [Doctors, Nurses, ] API End-points
    END_POINT_CLINICIAN: "clinician/",
    END_POINT_SCHEDULE: "clinician/schedule/",

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