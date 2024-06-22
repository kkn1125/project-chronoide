export const Message = {
  Directory: {
    PLACEHOLDER: "🗂️ 어느 프로젝트 인가요?",
  },
  Group: {
    PLACEHOLDER: "🖥️ 어떤 작업 영역인가요?",
  },
  Task: {
    PLACEHOLDER: "💡 현재 생각나는 일정을 입력해주세요.",
  },
  Content: {
    PLACEHOLDER: "✍️ 업무의 내용을 간략하게 적어주세요.",
  },
} as const;
export type Message = (typeof Message)[keyof typeof Message];
