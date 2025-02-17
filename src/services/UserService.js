const { default: httpRequest } = require("~/utils/httpRequest");

export const loginUser = async (email, password) => {
    return await httpRequest.post("login", {
        email,
        password,
    });
};

export const registerUser = async (email, password, first_name, last_name) => {
    return await httpRequest.post("register", {
        email,
        password,
        first_name,
        last_name,
    });
};

/**
 * @todo: Lấy danh sách người dùng phân trang từ API.
 * @purpose:
 *  - Hàm này gửi một yêu cầu HTTP GET tới API để lấy dữ liệu người dùng với tham số phân trang `page`.
 *  - Thông tin thêm: Dữ liệu trả về từ API sẽ được lưu trữ trong `res.data` và hàm sẽ trả về dữ liệu này cho các phần tiếp theo của ứng dụng.
 * @author: Tony
 * @since: 15-01-2025
 * @param {number} page - Số trang hiện tại, mặc định là 1 nếu không được chỉ định.
 * @return {Promise<object>} - Một Promise chứa dữ liệu người dùng phân trang trả về từ API.
 * @throws {Error} - Nếu có lỗi xảy ra trong quá trình gọi API, lỗi sẽ được ghi log ra console.
 */
export const getPaginationUsers = async (page = 1) => {
    return await httpRequest.get("users", {
        params: { page },
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
};

export const searchUsers = async (keyword) => {
    return await httpRequest.get("search-user", {
        params: { keyword },
    });
};

export const addUser = async (email, first_name, last_name) => {
    return await httpRequest.post("create-user", {
        email,
        first_name,
        last_name,
    });
};

export const updateUser = async (id, email, first_name, last_name) => {
    return await httpRequest.put(`edit-user/${id}`, {
        email,
        first_name,
        last_name,
    });
};

export const deleteUser = async (id) => {
    return await httpRequest.delete(`delete-user/${id}`);
};
