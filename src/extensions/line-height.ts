import { Extension } from '@tiptap/react';
import '@tiptap/extension-text-style';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    lineHeight: {
      setLineHeight: (size: string) => ReturnType;
      unsetLineHeight: () => ReturnType;
    };
  }
}

export const LineHeightExtension = Extension.create({
  name: 'lineHeight',
  // 구현부 추가
  addOptions() {
    return {
      types: ['paragraph', 'heading'],
      defaultLineHeight: 'normal',
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          lineHeight: {
            default: this.options.defaultLineHeight,
            parseHTML: (element) =>
              element.style.lineHeight || this.options.defaultLineHeight,
            renderHTML: (attributes) => {
              if (!attributes.lineHeight) {
                return {};
              }

              return {
                style: `line-height: ${attributes.lineHeight}`,
              };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setLineHeight:
        (lineHeight: string) =>
        ({ tr, state, dispatch }) => {
          const { selection } = state;
          const { from, to } = selection;

          // 변경된 트랜잭션을 저장할 변수
          let transaction = tr;

          // 선택 영역 내의 모든 노드를 순회하며 처리
          state.doc.nodesBetween(from, to, (node, pos) => {
            // 현재 노드가 우리가 지정한 타입 중 하나인지 확인
            if (this.options.types.includes(node.type.name)) {
              // 노드의 속성을 업데이트 (기존 속성은 유지하고 lineHeight만 변경)
              transaction = transaction.setNodeMarkup(pos, undefined, {
                ...node.attrs,
                lineHeight,
              });
            }
          });

          // 변경사항이 있으면 적용
          if (transaction !== tr && dispatch) {
            dispatch(transaction);
            return true;
          }

          return false;
        },

      unsetLineHeight:
        () =>
        ({ tr, state, dispatch }) => {
          const { selection } = state;
          const { from, to } = selection;

          let transaction = tr;

          state.doc.nodesBetween(from, to, (node, pos) => {
            if (this.options.types.includes(node.type.name)) {
              // 노드의 속성 복사
              const attrs = { ...node.attrs };
              // lineHeight 속성 제거
              delete attrs.lineHeight;

              transaction = transaction.setNodeMarkup(pos, undefined, attrs);
            }
          });

          if (transaction !== tr && dispatch) {
            dispatch(transaction);
            return true;
          }

          return false;
        },
    };
  },
});
