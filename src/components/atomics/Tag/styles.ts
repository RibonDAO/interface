import styled from "styled-components";

export const Text = styled.p`
    ...defaultBodyXsRegular,
    color: theme.colors.neutral[25],
`;
export const Container = styled.div`
    background-color: theme.colors.brand.primary[900],
    height: 28,
    min-width: 50,
    border-radius: 14,
    display: "flex",
    justify-content: "center",
    align-items: "center",
    padding: theme.spacingNative(4),
`;
