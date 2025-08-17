import {Accordion, AccordionItem} from "@nextui-org/react";
const HomePageAccordion = () => {
    return (  
    <section className="flex flex-col items-center md:w-[50rem] w-[20rem]">
        <div className="md:text-2xl text-large font-bold py-5 ">Frequently asked questions in the store</div>
        <Accordion variant="bordered" className="bg-slate-50 rounded-md  p-5 ">
          <AccordionItem className="p-2" key="1" aria-label="Accordion 1" title="How can I track my order?">
          Answer: After placing the order, you will receive an email or SMS containing a tracking code
          you will By entering this code in the "order tracking" section on the website,
          You can check the status of your order.
          </AccordionItem>
          <AccordionItem className="p-2" key="2" aria-label="Accordion 2" title="How do I use a discount code?">
          A: When finalizing your purchase, on the checkout page, a section called “Code
          "Discount". Enter your discount code in that section and then on
          Click the "Apply" button to apply the discount to the total amount.
          </AccordionItem>
          <AccordionItem className="p-2" key="3" aria-label="Accordion 3" title="Can I cancel or change my order?">
          A: As long as your order has not entered the processing stage, it is possible to cancel or
          There is a change of order. For this, log in to your account and from the section
          "Shopping cart" by canceling or changing the order of the selected products in the shopping cart
          control Once the order is processed, it will not be possible to cancel it.
          </AccordionItem>
        </Accordion>
      </section> 
      );
}
 
export default HomePageAccordion;