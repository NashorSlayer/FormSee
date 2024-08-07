import { createTheme, PaletteMode } from "@mui/material";
import React, { useMemo, useState } from "react";
import theme, { getDesignTokens } from "@/components/common/Theme";

export const useColorTheme = () => {
    const [mode, setMode] = useState<PaletteMode>("light");

    const toggleColorMode = () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
    }

    const modifiedTheme = useMemo(
        () => createTheme(getDesignTokens(mode)),
        [mode]
    );

    return {
        mode,
        toggleColorMode,
        theme: modifiedTheme,
    }
}