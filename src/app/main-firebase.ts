import * as main_firebase_qa from "./main-firebase-qa";
import * as main_firebase_prod from "./main-firebase-prod";

export const kalea_ecf_backend_api_client = {
    qa: main_firebase_qa.kalea_ecf_qa_backend_api_client,
    prod: main_firebase_prod.kalea_ecf_prod_backend_api_client,
};
