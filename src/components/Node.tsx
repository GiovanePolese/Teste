import React, {useState, useEffect} from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import colors from "../constants/colors";
import Status from "./Status";
import { Node as NodeType, IBlocks } from "../types/Node";
import Api from "./Api"

type Props = {
  node: NodeType;
  expanded: boolean;
  toggleNodeExpanded: (node: NodeType) => void;
};

const AccordionRoot = styled(Accordion)({
  margin: "16px 0",
  boxShadow: "0px 3px 6px 1px rgba(0,0,0,0.15)",

  "&:before": {
    backgroundColor: "unset",
  },
});

const AccordionSummaryContainer = styled(AccordionSummary)({
  padding: "0 24px",
  "& .MuiAccordionSummary-content": {
    margin: "10px 0 !important", // Avoid change of sizing on expanded
  },
  "& .MuiAccordionSummary-expandIconWrapper": {
    color: colors.faded,
  },
});

const BoxSummaryContent = styled(Box)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  paddingRight: 20,
});

const TypographyHeading = styled(Typography)({
  fontSize: 17,
  display: "block",
  color: colors.text,
  lineHeight: 1.5,
});

const TypographySecondaryHeading = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  color: colors.faded,
  lineHeight: 2,
}));

const TypographyContent = styled(Typography)({
  backgroundColor: "rgba(0, 0, 0, 0.12)",
  padding: "8px 8px 4px 8px",
  borderRadius: "2px",
  marginBottom: "4px",
});

const TypographyContentHeading = styled(Typography)({
  color: "#304FFE",
  fontWeight: "700",
  fontSize: "10px",
  marginBottom: "2px",
});

const Node: React.FC<Props> = ({ node, expanded, toggleNodeExpanded }) => {

  const [blocks, setBlocks] = useState<IBlocks[]>([]);

  const response = await Api(node.url);

  /*useEffect(() => {
    if (node.online) {
      fetch(`${node.url}/api/v1/blocks`)
      .then(res=>res.json())
      .then(
        (result) => {
          setBlocks(result.data)
        }
      )
    } 
  }, [node.online, node.url])*/

  return (
    <AccordionRoot
      elevation={3}
      expanded={expanded}
      onChange={() => toggleNodeExpanded(node)}
    >
      <AccordionSummaryContainer expandIcon={<ExpandMoreIcon />}>
        <BoxSummaryContent>
          <Box>
            <TypographyHeading variant="h5">
              {node.name || "Unknown"}
            </TypographyHeading>
            <TypographySecondaryHeading variant="subtitle1">
              {node.url}
            </TypographySecondaryHeading>
          </Box>
          <Status loading={node.loading} online={node.online} />
        </BoxSummaryContent>
      </AccordionSummaryContainer>
      <AccordionDetails>
        {blocks.map(block => (
          <>
            <TypographyContent>
            <div key={block.id}>
              <TypographyContentHeading>00{block.id}</TypographyContentHeading>
              <Typography>{block.attributes.data}</Typography>
            </div>
            </TypographyContent>
          </>
        ))}
        {node.online ? '' : <TypographyContent>Empty Node</TypographyContent>}
        
      </AccordionDetails>
    </AccordionRoot>
  );
};

export default Node;
