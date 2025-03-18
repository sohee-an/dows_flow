type Props = {
  children: React.ReactNode;
};

function DocumentsLayout({ children }: Props) {
  return <div className="flex flex-col gap-y-4">{children}</div>;
}

export default DocumentsLayout;
