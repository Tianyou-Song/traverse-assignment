import { component$ } from '@builder.io/qwik';
import { Breadcrumb } from './breadcrumb';

export default component$(({ items }: { items: { name: string, link?: string; }[]; }) => {
  const currentItem = items.pop();
  if (!currentItem) return;

  return (
    <Breadcrumb.Root>
      <Breadcrumb.List>
        {items.map((item, index) => (
          <>
            <Breadcrumb.Item key={index}>
              <Breadcrumb.Link
                class='text-[#7970A9] hover:underline'
                href={item.link}
              >
                {item.name}
              </Breadcrumb.Link>
            </Breadcrumb.Item>
            <Breadcrumb.Separator/>
          </>
        ))}
        <Breadcrumb.Item>
          <Breadcrumb.Page
            class='text-[#F8F8F2] font-bold'
          >
            {currentItem.name}
          </Breadcrumb.Page>
        </Breadcrumb.Item>
        {/* <Breadcrumb.Item>
          <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.Link href="/docs/styled/introduction/">Components</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.Page>Breadcrumb</Breadcrumb.Page>
        </Breadcrumb.Item> */}
      </Breadcrumb.List>
    </Breadcrumb.Root>
  );
});
