# CODEx.md - Hướng dẫn dự án Random Name Wheel

> File này dùng để hướng dẫn Codex khi tạo và chỉnh sửa dự án.  
> Bạn có thể chỉnh sửa trực tiếp các phần bên dưới theo ý muốn.

---

## 1. Tên dự án

**Random Name Wheel**

---

## 2. Mục tiêu dự án

Tạo một website nhỏ có chức năng quay random tên, giao diện tương tự trang `wheelofnames.com`.

Người dùng có thể nhập danh sách tên, sau đó bấm nút quay để chọn ra một tên trúng.

Dự án cần đơn giản, dễ hiểu, dễ chỉnh sửa và không dùng thư viện ngoài.

---

## 3. Công nghệ sử dụng

Chỉ sử dụng:

- HTML
- CSS
- JavaScript thuần

Không dùng:

- React
- Vue
- Angular
- jQuery
- Bootstrap
- Thư viện random bên ngoài
- Thư viện vẽ canvas bên ngoài

---

## 4. Các file cần có

Codex chỉ được tạo hoặc chỉnh sửa các file sau:

```text
index.html
style.css
script.js
codex.md
```

Không tự ý tạo thêm file nếu chưa được yêu cầu.

---

## 5. Mô tả giao diện

Giao diện cần giống tinh thần ảnh mẫu:

- Nền tối.
- Vòng quay lớn nằm bên trái.
- Bảng nhập tên nằm bên phải.
- Vòng quay có nhiều màu khác nhau.
- Tên hiển thị trên từng phần của vòng quay.
- Có nút quay rõ ràng.
- Sau khi quay xong, hiển thị tên trúng.

Bố cục mong muốn:

```text
+------------------------------------------------+
|                  Thanh tiêu đề                 |
+-------------------------------+----------------+
|                               |                |
|        Vòng quay tên          |   Ô nhập tên   |
|                               |                |
|        Nút quay               |   Danh sách    |
|                               |                |
+-------------------------------+----------------+
```

---

## 6. Chức năng chính

Website cần có các chức năng sau:

### 6.1. Nhập danh sách tên

Người dùng nhập tên vào ô textarea.

Quy tắc:

- Mỗi dòng là một tên.
- Bỏ qua dòng trống.
- Tự động cập nhật vòng quay khi danh sách thay đổi.

Ví dụ:

```text
Ali
Beatriz
Charles
Diya
Eric
Fatima
Gabriel
Hanna
```

---

### 6.2. Hiển thị vòng quay

Vòng quay cần:

- Chia thành nhiều phần theo số lượng tên.
- Mỗi phần có màu khác nhau.
- Có kim chỉ kết quả.
- Có hiệu ứng quay khi bấm nút.

Có thể dùng `canvas` hoặc CSS, nhưng ưu tiên cách đơn giản, dễ hiểu.

---

### 6.3. Quay và chọn tên trúng

Khi người dùng bấm nút quay:

1. Kiểm tra danh sách tên.
2. Chọn tên trúng theo luật random đặc biệt.
3. Quay vòng quay bằng animation.
4. Dừng lại.
5. Hiển thị kết quả.

---

## 7. Luật random đặc biệt

Đây là phần quan trọng nhất của dự án.

### Trường hợp 0 tên

Nếu không có tên nào:

- Không quay.
- Hiển thị thông báo:

```text
Vui lòng nhập ít nhất 1 tên.
```

---

### Trường hợp 1 tên

Nếu chỉ có 1 tên:

- Tên đó là người trúng.

Ví dụ:

```text
Ali
```

Kết quả:

```text
Ali
```

---

### Trường hợp 2 tên

Nếu có đúng 2 tên:

- Luôn ưu tiên tên cuối thắng.

Ví dụ:

```text
Ali
Beatriz
```

Kết quả luôn là:

```text
Beatriz
```

---

### Trường hợp nhiều hơn 2 tên

Nếu có nhiều hơn 2 tên:

- Tên đầu tiên có tỉ lệ trúng là `0%`.
- Tên cuối cùng có tỉ lệ trúng là `0%`.
- Chỉ các tên ở giữa mới có thể trúng.

Ví dụ:

```text
Ali
Beatriz
Charles
Diya
Eric
```

Trong đó:

```text
Ali   -> 0% cơ hội trúng
Eric  -> 0% cơ hội trúng
```

Chỉ có thể trúng:

```text
Beatriz
Charles
Diya
```

---

## 8. Hàm chọn người trúng bắt buộc

Codex phải dùng đúng logic này hoặc logic tương đương:

```js
function pickWinner(names) {
  if (names.length === 0) return null;
  if (names.length === 1) return names[0];
  if (names.length === 2) return names[1];

  const eligibleNames = names.slice(1, -1);
  return eligibleNames[Math.floor(Math.random() * eligibleNames.length)];
}
```

Không được đổi luật random nếu chưa được yêu cầu.

---

## 9. Quy tắc làm việc cho Codex

Trước khi viết hoặc sửa code, Codex phải:

1. Đọc các file hiện có.
2. Hiểu mục tiêu dự án.
3. Tóm tắt yêu cầu.
4. Lập kế hoạch ngắn.
5. Sau đó mới viết code.

Khi viết code:

- Làm giải pháp nhỏ nhất có thể.
- Không thêm thư viện ngoài.
- Không refactor phần không liên quan.
- Không đổi tên file nếu không cần.
- Không hardcode tên người trúng.
- Code phải dễ đọc.
- Tên biến nên dùng tiếng Anh.
- Giao diện có thể dùng tiếng Việt.

---

## 10. Tiêu chí hoàn thành

Dự án được xem là hoàn thành khi:

- Mở `index.html` là chạy được.
- Người dùng nhập danh sách tên được.
- Vòng quay hiển thị theo danh sách tên.
- Bấm quay có hiệu ứng quay.
- Sau khi quay có kết quả rõ ràng.
- Luật random đặc biệt hoạt động đúng.
- Không cần cài đặt thư viện ngoài.

---

## 11. Checklist kiểm thử

Codex phải kiểm tra các trường hợp sau:

### Test 1: Danh sách rỗng

Input:

```text

```

Kết quả mong muốn:

```text
Không quay và báo người dùng nhập tên.
```

---

### Test 2: Một tên

Input:

```text
Ali
```

Kết quả mong muốn:

```text
Ali thắng.
```

---

### Test 3: Hai tên

Input:

```text
Ali
Beatriz
```

Kết quả mong muốn:

```text
Beatriz luôn thắng.
```

---

### Test 4: Ba tên

Input:

```text
Ali
Beatriz
Charles
```

Kết quả mong muốn:

```text
Beatriz luôn thắng.
```

Vì Ali là tên đầu, Charles là tên cuối, cả hai đều có 0% cơ hội trúng.

---

### Test 5: Nhiều hơn ba tên

Input:

```text
Ali
Beatriz
Charles
Diya
Eric
```

Kết quả mong muốn:

```text
Chỉ Beatriz, Charles hoặc Diya có thể thắng.
Ali không được thắng.
Eric không được thắng.
```

---

## 12. Cách chạy dự án

Vì dự án dùng HTML, CSS và JavaScript thuần nên chỉ cần mở file:

```text
index.html
```

trên trình duyệt.

Không cần chạy server.

---

## 13. Quy trình làm việc đề xuất

Khi bắt đầu, Codex nên làm theo thứ tự:

```text
1. Đọc codex.md
2. Tạo index.html
3. Tạo style.css
4. Tạo script.js
5. Kiểm tra logic random
6. Kiểm tra giao diện
7. Tóm tắt kết quả
```

---

## 14. Prompt tiếp theo nên dùng với Codex

Sau khi file này đã có trong project, dùng prompt sau:

```text
Read codex.md carefully.

Then create the project according to the instructions.

Before coding:
- Restate the goal.
- Explain the implementation plan.
- Explain the random winner logic.

After coding:
- Summarize changed files.
- Explain how to run the app.
- Report the test checklist result.
```
