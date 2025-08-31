import { Table , TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
export default function SizeTable (){
return(
     <Table className="w-[600px]" isStriped aria-label="size table">
      <TableHeader className="bg-blue-100">
        <TableColumn>سایز</TableColumn>
        <TableColumn>قد</TableColumn>
        <TableColumn>وزن</TableColumn>
        <TableColumn>عرض سینه</TableColumn>
        <TableColumn>طول</TableColumn>
      </TableHeader>
      <TableBody>
        <TableRow key="1">
          <TableCell>Small</TableCell>
          <TableCell>160-170</TableCell>
          <TableCell>45-55</TableCell>
          <TableCell>45-46</TableCell>
          <TableCell>68-70</TableCell>
        </TableRow>
        <TableRow key="2">
          <TableCell>Medium</TableCell>
          <TableCell>170-180</TableCell>
          <TableCell>55-65</TableCell>
          <TableCell>47-48</TableCell>
          <TableCell>70-72</TableCell>
        </TableRow>
        <TableRow key="3">
          <TableCell>Large</TableCell>
          <TableCell>175-185</TableCell>
          <TableCell>65-75</TableCell>
          <TableCell>49-50</TableCell>
          <TableCell>72-74</TableCell>
        </TableRow>
        <TableRow key="4">
          <TableCell>XLarge</TableCell>
          <TableCell>180-188</TableCell>
          <TableCell>75-85</TableCell>
          <TableCell>51-52</TableCell>
          <TableCell>74-76</TableCell>
        </TableRow>
         <TableRow key="5">
          <TableCell>2XLarge</TableCell>
          <TableCell>188به بالا</TableCell>
          <TableCell>85-100</TableCell>
          <TableCell>53-54</TableCell>
          <TableCell>76-78</TableCell>
        </TableRow>
      </TableBody>
    </Table>
    )
} 