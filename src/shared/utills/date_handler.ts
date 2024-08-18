
export default class DateHandler{
    // Date 객체를 'YYYY-MM-DD' 문자열로 변환
    public static dateToString(date: Date): string {
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    }
}