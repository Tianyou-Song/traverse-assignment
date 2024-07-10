import { component$ } from '@builder.io/qwik';
import { Breadcrumb } from './breadcrumb';

export default component$(({ items }: { items: { name: string, link?: string; }[]; }) => {
  const currentItem = items[items.length - 1];
  const previousItems = items.slice(0, items.length - 1);

  return (
    <Breadcrumb.Root>
      <Breadcrumb.List>
        {previousItems.map((item, index) => (
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
