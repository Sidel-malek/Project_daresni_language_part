"use server";

import _axios from "@/lib/axios-config";
import { _fetchWithToken } from "@/lib/fetch-api";
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:7777';

// language-service

export const CreateLanguage = async (body) => {
    try {
      const res = await axios.post('/arabeLanguage/admin/addLevel', body, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
    }
};

// get submissions
export const getSubmissions = async (idLang, levelName) => {
    try {
      const res = await _axios.get(`http://localhost:7777/arabeLanguage/admin/${idLang}/${levelName}/submissions`);
      console.log(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
    }
};

// get list of levels
export const getLevels = async () => {
    try {
      const res = await _axios.get('http://localhost:7777/arabeLanguage/admin/levels/all');
      console.log(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
    }
};

// get level
export const getLevel = async (idLang, levelName) => {
    try {
      const res = await _axios.get(`http://localhost:7777/arabeLanguage/admin/${idLang}/levels/${levelName}`);
      console.log(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
    }
};

// update level
export const updateLevel = async (body, idLang, levelName) => {
    try {
      const res = await _axios.put(`http://localhost:7777/arabeLanguage/admin/${idLang}/levels/${levelName}/update`, body, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
    }
};

// upgrade Student
export const upGradeStudent = async (idLang, idStudent) => {
    try {
      const res = await _axios.post(`http://localhost:7777/arabeLanguage/admin/${idLang}/submissions/${idStudent}/upgradeLevel`);
      console.log(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
    }
};

/***************************  student *************************************/

// get available languages
export const getLanguages = async () => {
    try {
      const res = await _axios.get('http://localhost:7777/arabeLanguage/student/languages');
      console.log(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
    }
};

// inscription (learn)
export const Inscription = async (idLang) => {
    try {
      const res = await _axios.post(`http://localhost:7777/arabeLanguage/student/${idLang}/inscription`);
      console.log(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
    }
};

// upgrade Student Level
export const upgradeStudent = async (idL, idS) => {
    try {
      const res = await _axios.post(`http://localhost:7777/arabeLanguage/admin/${idL}/submissions/${idS}/upgradeLevel`);
      console.log(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
    }
};

// upgrade Step
export const upgradeStep = async (idL, ns) => {
    try {
      const res = await _axios.post(`http://localhost:7777/arabeLanguage/student/${idL}/${ns}/upgradeStep`);
      return res.data;
    } catch (err) {
      console.log(err);
    }
};

// display file exam
export const displayFile = async (idlang) => {
    try {
      const response = await _axios.get(`http://localhost:7777/arabeLanguage/student/${idlang}/displayExam`);
      return response.data;
    } catch (err) {
      console.log(err);
      return { success: false };
    }
};

// upload solution exam file
export const uploadFile = async (idLang, body) => {
    try {
      const res = await _axios.post(`http://localhost:7777/arabeLanguage/student/${idLang}/uploadExamSolution`, body, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
    }
};
